const Action = require("../models/actionModel");

exports.createAction = async (req, res) => {
  try {
    const { deviceId, actionType, value } = req.body;

    const action = await Action.create({
      actionType,
      value,
      DeviceId: deviceId,
    });

    res.status(201).json(action);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLatestAction = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const action = await Action.findOne({
      where: { DeviceId: deviceId },
      order: [["id", "DESC"]],
    });

    if (action) {
      const actionData = action.get({ plain: true });
      await action.destroy();
      res.status(200).json(actionData);
    } else {
      res.status(404).json({ message: "No actions found for this device" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
