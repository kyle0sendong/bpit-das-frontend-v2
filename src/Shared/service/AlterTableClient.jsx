import axios from "axios";

const AlterTableClient = {

	Alter: async (url, data) => {
		await axios.post(url, JSON.stringify(data), {
			headers: {
			"content-type": "application/json",
			}
		})
	}

}

export default AlterTableClient;