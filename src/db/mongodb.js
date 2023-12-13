import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://raihanregitappqita:R4ihanregita@ppqitadb.ebdkl0n.mongodb.net/mynotes",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
};
