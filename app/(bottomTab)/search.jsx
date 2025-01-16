import React, { useState, useCallback, useRef } from "react";
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
import IconSVG from '../../assets/svg';
import { router } from "expo-router";
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchStocks = async ({ pageParam = 1 }) => {
  try {
    const response = await fetch(
      `https://eb88-122-176-44-176.ngrok-free.app/stocks?page=${pageParam}&pageSize=98`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Add validation for expected data structure
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format received');
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const CreateAccount = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([]);
  const allPagesLoaded = useRef(false);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.data || lastPage.data.length === 0) {
        allPagesLoaded.current = true;
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    retry: 3, // Add retry logic
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Get all stocks from all loaded pages with error handling
  const allStocks = React.useMemo(() => {
    try {
      return data?.pages?.flatMap(page => page?.data || []) ?? [];
    } catch (error) {
      console.error('Error processing stocks data:', error);
      return [];
    }
  }, [data]);

  // Filter stocks based on search query with error handling
  const filteredStocks = React.useMemo(() => {
    try {
      if (!searchQuery.trim()) return allStocks;
      
      const normalizedSearch = searchQuery.toLowerCase().trim();
      return allStocks.filter(stock => 
        stock?.name?.toLowerCase().includes(normalizedSearch)
      );
    } catch (error) {
      console.error('Error filtering stocks:', error);
      return [];
    }
  }, [allStocks, searchQuery]);

  // Debounced search handler
  const handleSearch = (text) => {
    setIsSearching(true);
    setSearchQuery(text);
    
    // Reset searching state after a delay
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  // Modified scroll handler with error handling
  const handleScroll = useCallback((event) => {
    try {
      if (searchQuery || isSearching) return;
      
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const paddingToBottom = 20;
      const isCloseToBottom = 
        layoutMeasurement.height + contentOffset.y >= 
        contentSize.height - paddingToBottom;

      if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    } catch (error) {
      console.error('Error handling scroll:', error);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, searchQuery, isSearching]);

  const handleStockSelection = useCallback((stock) => {
    if (!stock?.id) return; // Add validation

    setSelectedStocks(prevSelected => {
      if (prevSelected.some(s => s.id === stock.id)) {
        return prevSelected.filter(s => s.id !== stock.id);
      }
      
      if (prevSelected.length < 3) {
        return [...prevSelected, stock];
      }
      
      return [...prevSelected.slice(1), stock];
    });
  }, []);

  const isSelected = useCallback((stockId) => {
    return selectedStocks.some(stock => stock.id === stockId);
  }, [selectedStocks]);

  if (status === 'error') {
    return (
      <View style={[styles.parentContainer, styles.centerContent]}>
        <Text style={styles.errorText}>
          {error?.message || 'An error occurred while loading stocks'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.parentContainer}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.push('/(home)/SignupName')}
          style={styles.backButtonContainer}
        >
          <IconSVG name="backbutton" width={32} height={32} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.text}>Choose 1 or more stocks you like</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.textInputWrapper}>
          <IconSVG name="search" width={20} height={20} style={styles.searchIcon} />
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
          {filteredStocks.map((stock) => (
            <TouchableOpacity 
              key={stock.id} 
              style={[styles.card, isSelected(stock.id) && styles.selectedCard]}
              onPress={() => handleStockSelection(stock)}
            >
              <Image 
                source={{ uri: 'https://via.placeholder.com/88x90' }} 
                style={styles.image}
                defaultSource={require("./../../assets/images/zomatologo.png")}
              />
              <Text style={styles.name}>{stock.name || 'Unknown Stock'}</Text>
              {isSelected(stock.id) && (
                <View style={styles.tickMark}>
                  <Text style={styles.tickMarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {isFetchingNextPage && (
          <ActivityIndicator size="large" color="#1ED760" style={styles.loader} />
        )}
        {filteredStocks.length === 0 && !isLoading && !isSearching && (
          <Text style={styles.noResultsText}>No stocks found</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedStocks.length >= 1 ? styles.activeButton : styles.inactiveButton,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff0000',
    fontSize: scale(14),
    marginBottom: verticalScale(10),
  },
  retryButton: {
    backgroundColor: '#1ED760',
    padding: moderateScale(10),
    borderRadius: scale(5),
  },
  retryText: {
    color: 'white',
    fontSize: scale(14),
  },
  loader: {
    marginVertical: verticalScale(20),
  },
  noResultsText: {
    color: '#fff',
    fontSize: scale(14),
    textAlign: 'center',
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
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    borderRadius: 10,
    width: 80,
    height: 120,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
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
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'green',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickMarkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  continueButton: {
    position: 'absolute',
    bottom: 10,
    left: '25%',
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
    backgroundColor: '#535353',
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(12),
  },
});