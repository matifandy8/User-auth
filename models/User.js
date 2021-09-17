const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			requireq: false,
		},
		email: {
			type: String,
			requireq: true,
		},
		password: {
			type: String,
			requireq: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);

module.exports = User;
