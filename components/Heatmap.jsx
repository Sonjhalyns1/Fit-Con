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

export default function Heatmap() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [commitsData, setCommitsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      const user = auth.currentUser;
      if (!user) return;
      setLoading(true);
      const historyRef = collection(db, "history");
      const q = query(historyRef, where("uuid", "==", user.uid));
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
  }, [auth.currentUser?.uid]);

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
          numDays={Dimensions.get('window').width / 5}
          width={Dimensions.get("window").width/1.20}
          height={Dimensions.get("window").height/4}
          chartConfig={chartConfig}
          squareSize={Dimensions.get("window").width/22}
        />
      

      
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
