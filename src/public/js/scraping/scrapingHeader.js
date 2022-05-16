const header = {
  "Content-Type": "application/json",
  "user-id": process.env.HYPHEN_USER_ID,
  // prettier-ignore
  "Hkey": process.env.HYPHEN_HKEY,
};

export default header;
