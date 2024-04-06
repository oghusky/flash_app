const Report = require("../models/Report");

exports.createReport = async (req, res) => {
    try {
        const { reportedItem, reason } = req.body;
        const report = await Report.create({ reporter: req.user._id, reportedItem, reason });
        return res.status(201).json({ msg: "Report created", report });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}