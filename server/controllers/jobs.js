import JobList from "../models/JobList.js";

export const getPositions = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 8;
        const skip = (page - 1) * limit;

        const query = {};
        if (req.query.description) {
            query.description = { $regex: req.query.description, $options: 'i' };
        }
        if (req.query.location) {
            query.location = { $regex: req.query.location, $options: 'i' };
        }
        if (req.query.full_time === 'true') {
            query.type = { $regex: 'full time', $options: 'i' };
        } else if (req.query.full_time === 'false') {
            query.type = { $regex: 'part time', $options: 'i' };
        }

        const positions = await JobList.find(query).skip(skip).limit(limit);
        res.status(200).json(positions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPositionById = async (req, res) => {
    try {
        const position = await JobList.findOne({ id: req.params.id });
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.status(200).json(position);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
