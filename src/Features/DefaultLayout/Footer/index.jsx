import { Layout } from "antd"

export default function Footer() {
	const {Footer} = Layout;
	return (
		<>
			<Footer style={{ textAlign: 'center' }}>
				BPIT ©{new Date().getFullYear()}
			</Footer>
		</>
	)
}