module.exports.getWarden = async (req, res) => {
    try {
        const wardens = await Warden.find();
        res.json(wardens);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
module.exports.addWarden = async (req, res) => {
    try {
        const newWarden = new Warden(req.body);
        await newWarden.save();
        res.status(201).json(newWarden);
    } catch (error) {
        res.status(400).json({ error: "Invalid data" });
    }
}