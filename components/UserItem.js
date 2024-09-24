// components/UserItem.js
import React from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const UserItem = ({ user, onSelectUser, onDeleteUser }) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => onDeleteUser(user.id) },
      ]
    );
  };

  return (
    <View style={styles.userItem}>
      <View>
        <Text style={styles.userName}>Tên: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Tuổi: {user.age}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onSelectUser(user)}
          style={styles.editButton}
        >
          <MaterialIcons name="update" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <FontAwesome5 name="trash-alt" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    elevation: 2, // Đổ bóng cho đẹp
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
});

export default UserItem;
