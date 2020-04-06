// Credit: https://andeers.com/2019/03/eleventy-essentials/

module.exports = {
	production: process.env.NODE_ENV === "production",
	development: process.env.NODE_ENV === "development",
	env: process.env.NODE_ENV || "development",
	notReady: false, // Flag to prevent something from rendering.
	time: () => {
		return new Date(); // Simplest example, could use Moment.js to return another format.
	},
};
