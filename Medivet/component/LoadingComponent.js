import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#378985" />
      <Text style={styles.loadingText}>รอซักครู่...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default Loading;
