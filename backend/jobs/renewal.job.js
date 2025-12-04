const Policy = require('../src/models/Policy.model');
const dayjs = require('dayjs');
const emailer = require('../src/utils/email');

module.exports = async function renewalJob() {
  try {
    const in30 = dayjs().add(30, 'day').toDate();
    const start = new Date(in30.setHours(0,0,0,0));
    const end = new Date(in30.setHours(23,59,59,999));

    // find policies expiring on that day
    const expiring = await Policy.find({ endDate: { $gte: start, $lte: end } }).populate('user');

    for (const p of expiring) {
      // send reminder email (emailer utility will no-op if not configured)
      await emailer.send(p.user.email, 'Policy Renewal Reminder', `Your policy ${p.policyNumber} will expire on ${p.endDate}`);
      console.log(`Reminder sent for policy ${p.policyNumber} to ${p.user.email}`);
    }
  } catch (err) {
    console.error('Renewal job failed', err);
  }
};
