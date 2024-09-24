import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
  Modal,
  Button,
  Switch,
  Text,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import AddUserForm from "./components/AddUserForm";
import UpdateUserForm from "./components/UpdateUserForm";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State cho Dark Mode

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng: ", error);
      Alert.alert("Lỗi", "Không thể lấy danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (user) => {
    try {
      if (selectedUser) {
        const userDoc = doc(db, "users", selectedUser.id);

        // Kiểm tra xem tài liệu có tồn tại hay không
        const userSnapshot = await getDoc(userDoc);
        if (!userSnapshot.exists()) {
          Alert.alert("Lỗi", "Người dùng không tồn tại.");
          return;
        }

        await updateDoc(userDoc, user);
        Alert.alert("Thành công", "Cập nhật người dùng thành công");
      } else {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, user);
        Alert.alert("Thành công", "Thêm người dùng thành công");
      }
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật người dùng: ", error);
      Alert.alert("Lỗi", "Không thể thêm/cập nhật người dùng");
    }
    setModalVisible(false); // Đóng modal sau khi submit
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      Alert.alert("Thành công", "Xóa người dùng thành công");
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng: ", error);
      Alert.alert("Lỗi", "Không thể xóa người dùng");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* Switch để bật/tắt Dark Mode */}
      <View style={styles.switchContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
          Dark Mode
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <AddUserForm onSubmit={handleSubmit} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <UserList
        users={users}
        onSelectUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        isDarkMode={isDarkMode} // Truyền props
      />

      {/* Modal cho việc sửa thông tin người dùng */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <UpdateUserForm
              onSubmit={handleSubmit}
              selectedUser={selectedUser}
            />
            <Button title="Hủy" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#f0f0f0", // Nền sáng
  },
  darkContainer: {
    backgroundColor: "#333", // Nền tối
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  lightText: {
    color: "#000", // Màu chữ cho chế độ sáng
    fontSize: 18,
  },
  darkText: {
    color: "#fff", // Màu chữ cho chế độ tối
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền tối mờ
  },
  modalContainer: {
    width: "80%", // Chiều rộng modal
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default App;
