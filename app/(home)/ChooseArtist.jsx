import React, { useState, useCallback, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import IconSVG from "../../assets/svg";
import { router } from "expo-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api";

const fetchStocks = async ({ pageParam = 1 }) => {
  try {
    const response = await apiClient.get("/stocks", {
      params: {
        page: pageParam,
        pageSize: 98,
      },
    });
    console.log("Fetched stocks:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching stocks:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

const searchStocks = async (searchQuery) => {
  try {
    const response = await apiClient.get("/stocks/search", {
      params: {
        search: searchQuery,
        sortBy: "name",
        sortOrder: "asc",
      },
    });
    console.log("Search results:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error searching stocks:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

const CreateAccount = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([]);
  const allPagesLoaded = useRef(false);
  const searchDebounceTimeout = useRef(null);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfinite,
    status,
    error: infiniteError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.data || lastPage.data.length === 0) {
        allPagesLoaded.current = true;
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: !searchQuery,
  });

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    error: searchError,
  } = useQuery({
    queryKey: ["stockSearch", searchQuery],
    queryFn: () => searchStocks(searchQuery),
    enabled: searchQuery.length > 0,
    staleTime: 30000,
  });

  const displayedStocks = useMemo(() => {
    if (searchQuery) {
      return searchData?.data || [];
    }
    return infiniteData?.pages?.flatMap((page) => page?.data || []) ?? [];
  }, [infiniteData, searchData, searchQuery]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
    }
    searchDebounceTimeout.current = setTimeout(() => {
      setSearchQuery(text);
    }, 300);
  };

  const handleScroll = useCallback(
    (event) => {
      if (searchQuery) return;
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const paddingToBottom = 20;
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
      if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, searchQuery]
  );

  const handleStockSelection = useCallback((stock) => {
    setSelectedStocks((prevSelected) => {
      if (prevSelected.some((s) => s.id === stock.id)) {
        return prevSelected.filter((s) => s.id !== stock.id);
      }
      if (prevSelected.length < 3) {
        return [...prevSelected, stock];
      }
      return [...prevSelected.slice(1), stock];
    });
  }, []);

  const isSelected = useCallback(
    (stockId) => selectedStocks.some((stock) => stock.id === stockId),
    [selectedStocks]
  );

  const isLoading = isLoadingInfinite || isLoadingSearch;
  const error = infiniteError || searchError;

  if (status === "error") {
    return (
      <View style={[styles.parentContainer, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.parentContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(home)/SignupName")}>
          <IconSVG
            name="backbutton"
            width={32}
            height={32}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Choose 1 or more stocks you like</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.textInputWrapper}>
          <IconSVG
            name="search"
            width={20}
            height={20}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Search..."
            placeholderTextColor="#aaa"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>
      <ScrollView
        style={styles.scrollableArea}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View style={styles.grid}>
          {displayedStocks.map((stock) => (
            <TouchableOpacity
              key={stock.id}
              style={[styles.card, isSelected(stock.id) && styles.selectedCard]}
              onPress={() => handleStockSelection(stock)}
            >
              <Image
                source={{ uri: "https://via.placeholder.com/88x90" }}
                style={styles.image}
                defaultSource={require("./../../assets/images/zomatologo.png")}
              />
              <Text style={styles.name}>{stock.name}</Text>
              {isSelected(stock.id) && (
                <View style={styles.tickMark}>
                  <Text style={styles.tickMarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {isFetchingNextPage && !searchQuery && (
          <ActivityIndicator
            size="large"
            color="#1ED760"
            style={styles.loader}
          />
        )}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#1ED760"
            style={styles.loader}
          />
        )}
        {displayedStocks.length === 0 && !isLoading && (
          <Text style={styles.noResultsText}>No stocks found</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedStocks.length >= 1
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => {
          if (selectedStocks.length >= 1) {
            router.replace("/(bottomTab)/home");
          }
        }}
        disabled={selectedStocks.length < 1}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff0000",
    fontSize: scale(14),
    marginBottom: verticalScale(10),
  },
  retryButton: {
    backgroundColor: "#1ED760",
    padding: moderateScale(10),
    borderRadius: scale(5),
  },
  retryText: {
    color: "white",
    fontSize: scale(14),
  },
  loader: {
    marginVertical: verticalScale(20),
  },
  noResultsText: {
    color: "#fff",
    fontSize: scale(14),
    textAlign: "center",
    marginTop: verticalScale(20),
  },
  parentContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  text: {
    marginLeft: moderateScale(15),
    color: "#fff",
    fontSize: scale(16),
  },
  header: {
    top: verticalScale(42),
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginLeft: moderateScale(15),
  },
  inputContainer: {
    marginTop: verticalScale(70),
    paddingHorizontal: moderateScale(16),
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: scale(10),
    paddingHorizontal: moderateScale(10),
    height: verticalScale(48),
  },
  searchIcon: {
    marginRight: moderateScale(8),
  },
  textInput: {
    flex: 1,
    fontSize: scale(14),
  },
  scrollableArea: {
    flex: 1,
    marginTop: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  card: {
    borderRadius: 10,
    width: 80,
    height: 120,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedCard: {
    opacity: 0.7,
  },
  image: {
    width: 88,
    height: 90,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    color: "#fff",
    fontSize: scale(10),
    textAlign: "center",
  },
  tickMark: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "green",
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tickMarkText: {
    color: "white",
    fontWeight: "bold",
  },
  continueButton: {
    position: "absolute",
    bottom: 10,
    left: "25%",
    paddingHorizontal: moderateScale(20),
    width: scale(179),
    height: verticalScale(49),
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#1ED760",
  },
  inactiveButton: {
    backgroundColor: "#535353",
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(12),
  },
});
