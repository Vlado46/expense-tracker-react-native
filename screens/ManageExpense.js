import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../constants/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import ButtonComp from "../constants/UI/ButtonComp";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test!!!",
        amount: 29.99,
        date: new Date("2024-01-09"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2024-01-10"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <ButtonComp style={styles.btnStyle} mode="flat" onPress={cancelHandler}>
          Cancel
        </ButtonComp>
        <ButtonComp style={styles.btnStyle} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </ButtonComp>
      </View>
      {isEditing && (
        <View style={styles.delete}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  delete: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
