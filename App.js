import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(
      "mongodb+srv://ykebed40:Betelhem383335!@cluster0.rwrxxf4.mongodb.net/contact_db/contacts"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }
    console.log(response);
    return (
      <View>
        <Text>API called Successfully</Text>
        <Text>Bitcoin(USD): {response["bpi"]["USD"].rate}</Text>
      </View>
    );
  };

  return <View style={styles.container}>{getContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
