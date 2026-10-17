import { View, Text, StyleSheet } from "react-native";

type TransactionItemProps = {
    title: string;
    amount: number;
    type: "income" | "expense";
};

export default function TransactionItem({title, amount, type}: TransactionItemProps){
    return(
        <View style = {styles.container}>
            <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.type}>{type}</Text>
        </View>
        
        <Text style={[styles.amount, {color: type === "income" ? "#1bc749" : "#b21212"}]}>{type === "income" ? "+" : "-"} KSH {amount}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 16,
        fontWeight:"600",
    },
    type: {
        color: "#777",
        fontSize: 14,
        marginTop: 4,
    },
    amount: {

    }
})