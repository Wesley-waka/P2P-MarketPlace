import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: '24h'
	});
};
export default generateTokenAndSetCookie;
