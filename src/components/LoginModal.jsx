import { Button, Checkbox, ConfigProvider, Form, Input, Modal } from "antd";
import { AppleFilled, FacebookFilled, GoogleOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import "./LoginModal.css";

const theme = { token: { colorPrimary: "#7b2cbf", fontFamily: "'Fira Sans', sans-serif" } };

export default function LoginModal({ open, onClose }) {
  // shortcut: no auth backend yet, submit only validates and closes; wire to the real login API.
  const onFinish = () => onClose();

  return (
    <ConfigProvider theme={theme}>
      <Modal open={open} onCancel={onClose} footer={null} width={538} style={{ top: 40 }} className="login-modal" destroyOnHidden>
        <p className="login-label">Đăng nhập</p>
        <h2 className="login-title">All About Hair chào bạn trở lại.</h2>
        <p className="login-sub">
          Bạn chưa có tài khoản? <a href="#">Tạo tài khoản</a>
        </p>

        <Form onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="phone"
            rules={[{ required: true, pattern: /^0\d{9}$/, message: "Số điện thoại không hợp lệ" }]}
          >
            <Input variant="underlined" size="large" prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]} style={{ marginBottom: 8 }}>
            <Input.Password variant="underlined" size="large" prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
          </Form.Item>
          <div className="login-forgot">
            <a href="#">Quên mật khẩu?</a>
          </div>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ mật khẩu cho lần sau</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="login-submit">
            ĐĂNG NHẬP
          </Button>
        </Form>

        <div className="login-social">
          <span>Hoặc đăng nhập bằng</span>
          <div className="login-social-icons">
            <button type="button" aria-label="Đăng nhập bằng Apple"><AppleFilled style={{ color: "#000" }} /></button>
            <button type="button" aria-label="Đăng nhập bằng Google"><GoogleOutlined style={{ color: "#ea4335" }} /></button>
            <button type="button" aria-label="Đăng nhập bằng Facebook"><FacebookFilled style={{ color: "#1877f2" }} /></button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
