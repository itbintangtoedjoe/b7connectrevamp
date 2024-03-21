import { Alert } from "react-native";

export async function CheckRemarks(remarks) {
  if (remarks.length < 5) {
    Alert.alert(
      "Warning",
      "Please enter a valid reason (5 characters minimum)"
    );
    return "Not valid";
  } else return;
}
