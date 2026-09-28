import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useState } from "react";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: string;
}
const CATEGORIES = ["Income", "Food", "Transport", "Bills", "Other"];
export default function Home(){
const [category, setCategory] = useState("Food");
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [transactions, setTransactions] = useState<Transaction[]>([
    {id: "1", title: "Salary", amount: 15000, category: "Income"},
    {id: "2", title: "Rent", amount: -8000, category: "Bills"},
    {id: "3", title: "Groceries", amount: -1200, category: "Food"},
    {id: "4", title: "Freelance Gig", amount: 3500, category: "Income"},
    {id: "5", title: "Bonus Tip", amount: 200, category: "Income"},
    {id: "6", title: "Transport", amount: -15, category: "Transport"},
]);
const[count, setCount] = useState(0);
const[sortAsc, setSortAsc] = useState<boolean | null>(null);

function addTransaction(){
  if(title.trim() === "" || amount.trim() === ""){
    return;
  }
  const parsedAmount = parseFloat(amount)
  if(isNaN(parsedAmount)){
    alert("Invalid amount");
    return;
  }
  const isIncome = category === "Income";
  const finalAmount = isIncome ? Math.abs(parsedAmount) : -Math.abs(parsedAmount); 
  const newTransaction: Transaction = {
    id: Date.now().toString(),
    title: title,
    amount: finalAmount,
    category: category
  };

  setTransactions([newTransaction, ...transactions]);
  setTitle("");
  setAmount("");
}
function deleteTransaction(id: string){
  setTransactions(transactions.filter((item) => item.id !== id));
}
function toggleSort(){
  if(sortAsc === null || sortAsc === false){
    setSortAsc(true)
  }else{
    setSortAsc(false)
  }
}

const displayedTransactions = [...transactions].sort((a,b) => {
  if(sortAsc === null) return 0;
  return sortAsc ? a.amount - b.amount : b.amount - a.amount;
});
const total = transactions.reduce((sum, item)=> sum + item.amount, 0);


  return(
    <View style={styles.container}>
      <Text style={styles.text}>
        Pesa Ping
      </Text>
      <Text style={styles.balance}>KES {total.toLocaleString()}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style = {styles.input}
          placeholder="Enter Title (e.g Lunch)"
          placeholderTextColor='#888'
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style = {styles.input}
          placeholder="Enter Amount"
          placeholderTextColor='#888'
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
        />
      </View>
      <View style = {styles.chipRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.chip, category === cat && styles.chipActive
            ]}
          >
            <Text style = {styles.chipText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={addTransaction} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSort}>
          <Text style={styles.text}>{sortAsc === null ? "Sort": sortAsc ? "Sorted Low -> High": "Sorted High -> Low"}</Text>
        </TouchableOpacity>
      <FlatList
          data={displayedTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row} onPress={() => deleteTransaction(item.id)}>
              <Text style={styles.rowText}>{item.title}</Text>
              <Text style = {styles.text}>{item.category}</Text>
              <Text style={[
                styles.rowAmount,
                {color: item.amount < 0 ? "#ff6b6b" : "#4ade80"}
                ]}> 
                {item.amount > 0 ? "+" : ""}
                {item.amount.toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
      />
      <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
          <Pressable 
              style={styles.button}
              onPress={()=> setCount(count+1)}>
            <Text style={styles.text}>
              ADD
            </Text>
          </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingTop: 20,
    paddingHorizontal: 60,

  },
  text: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  balance: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#2e2e4e',
    borderBottomWidth: 1,
  },
  rowText: {
    color: "#ddd",
    fontSize: 16,
  },
  rowAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: "#2e2e4e",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8
  },
  button: {
    backgroundColor: "#4ade80",
    marginTop: 10,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 8,
    paddingBottom: 6,
    alignItems: "center",
    color: "#4adede"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e"
  },
  chipRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
},
chip: {
  backgroundColor: "#2e2e4e",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 16,
},
chipActive: {
  backgroundColor: "#4ade80",
},
chipText: {
  color: "#fff",
  fontSize: 13,
},
})