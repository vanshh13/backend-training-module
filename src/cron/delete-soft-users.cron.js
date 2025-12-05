const cron = require("node-cron");

module.exports = function ({ hardDeleteSoftUsers }) {
    // RUN DAILY AT 00:05 AM
    cron.schedule("0 2 * * *", async () => {
        console.log("Cron Started: Hard deleting soft deleted users...");

        try {
            const result = await hardDeleteSoftUsers();
            console.log(`Cron Completed: Deleted ${result.deletedCount} users`);
        } catch (err) {
            console.error("Cron Error:", err);
        }
    });
};
