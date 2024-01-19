import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../data/Firebase';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoadingAni from '../components/LoadingAni';
import { COLORS } from '../constants/theme';

const chartConfig = {
  backgroundGradientFrom: COLORS.brown,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.darkBrown,
  backgroundGradientToOpacity: 0.25,
  color: (opacity = 1) => `rgba(96, 108, 56, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};



const FriendsHeatmap = ({ FriendUID, FriendName }) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [commitsData, setCommitsData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const routeToFriendsHistory = (FriendId) => {
        navigation.navigate("Friends History", {FriendsId: FriendId})
      }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const historyRef = collection(db, 'history');
        const q = query(historyRef, where('uuid', '==', FriendUID));
        const querySnap = await getDocs(q);

        const data = [];

        querySnap.forEach((doc) => {
          const date = doc.data().date.split('T')[0];
          data.push({ date, count: 1 });
        });

        setCommitsData(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [FriendUID]);

  

  const oneMonthAheadDate = new Date();
  oneMonthAheadDate.setMonth(oneMonthAheadDate.getMonth() + 1);

  if (loading) {
    return <LoadingAni />;
  }

  return (
    <View style = {tw` mb-3 rounded-xl `}>
      <TouchableOpacity onPress={() => routeToFriendsHistory(FriendUID)}>

      
      <View style = {tw``}>
            <View style = {tw`flex-row items-center`}>

              
                <View key={FriendUID} style={[{width: wp(14)},tw`border p-3 rounded-full bg-[${COLORS.dark}] m-2`]}>
                  <Text style={tw`text-[${COLORS.primary}] text-lg font-bold text-center text-xl`}>{FriendName.slice(0,1)}</Text>

                </View>
                
            
                <Text style = {tw`font-semibold text-lg text-[${COLORS.green}]`}>{FriendName}</Text>
              </View>
        </View>
      
      <ContributionGraph
        values={commitsData}
        endDate={oneMonthAheadDate}
        numDays={Dimensions.get('window').width / 5}
        width={Dimensions.get('window').width / 1.25}
        height={210}
        chartConfig={chartConfig}
        squareSize={Dimensions.get('window').width / 20}
      />
      
      {/* <Text style={[{ fontSize: wp(4.5) }, tw`pb-3 text-[${COLORS.darkBrown}] font-semibold`]}>
        {FriendName}
      </Text> */}
      
      </TouchableOpacity>
    </View>
  );
};

export default FriendsHeatmap;

  