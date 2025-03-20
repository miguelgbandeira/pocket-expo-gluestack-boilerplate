import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase, { AsyncAuthStore } from "pocketbase";

const store = new AsyncAuthStore({
    save: async (serialized) => AsyncStorage.setItem("pb_auth", serialized),
    initial: AsyncStorage.getItem("pb_auth"),
});

const pb = new PocketBase(process.env.POCKETBASE_URL, store);

export default pb;
