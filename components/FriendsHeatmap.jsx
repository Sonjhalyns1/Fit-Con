import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  ContributionGraph,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../data/Firebase';
import { getAuth } from 'firebase/auth';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import tw from "twrnc"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function FriendsHeatmap({FriendUID, FriendName}) {
    
    const navigation = useNavigation();
    const auth = getAuth();
    const [commitsData, setCommitsData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchHistory() {
        setLoading(true);
        const historyRef = collection(db, "history");
        const q = query(historyRef, where("uuid", "==", FriendUID));
        const querySnap = await getDocs(q);
  
        const data = [];
  
        querySnap.forEach((doc) => {
          const date = doc.data().date.split("T")[0];
          
          data.push({ date, count: 1 });
        });
  
        setCommitsData(data);
        setLoading(false);
      }
  
      fetchHistory();
    }, );
    
  
    const routeToHistory = () => {
      navigation.navigate("History");
    };
  
    const oneMonthAheadDate = new Date();
    oneMonthAheadDate.setMonth(oneMonthAheadDate.getMonth() + 1);
  
    return (
      <View>
        
        
          <ContributionGraph
            values={commitsData}
            endDate={oneMonthAheadDate}
            numDays={Dimensions.get("window").width/5}
            width={Dimensions.get("window").width/1.25}
            height={210}
            chartConfig={chartConfig}
            squareSize={Dimensions.get("window").width/20}
          />
          <Text style = {[{fontSize: wp(4.5)},tw`pb-3 text-[${COLORS.darkBrown}] font-semibold`]}>{FriendName}</Text>
        
  
        
      </View>
    );
  }
  
  const chartConfig = {
    backgroundGradientFrom: COLORS.brown,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: COLORS.darkBrown,
    backgroundGradientToOpacity: 0.25,
    color: (opacity = 1) => `rgba(96, 108, 56, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };
  