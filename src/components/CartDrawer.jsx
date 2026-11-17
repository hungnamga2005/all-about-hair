import { createContext, useContext, useState } from "react";
import { Button, ConfigProvider, Drawer, Empty, InputNumber, List } from "antd";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const toNumber = (price) => Number(String(price).replace(/\D/g, "")) || 0;
const formatVnd = (n) => `${n.toLocaleString("vi-VN")} đ`;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  // shortcut: name is the item key, so two products with the same name merge; use a real product id when data has one.
  const add = (product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.name === product.name);
      return found
        ? prev.map((i) => (i === found ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
    setOpen(true);
  };
  const setQty = (name, qty) =>
    setItems((prev) => prev.map((i) => (i.name === name ? { ...i, qty } : i)));
  const remove = (name) => setItems((prev) => prev.filter((i) => i.name !== name));

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + toNumber(i.price) * i.qty, 0);

  return (
    <CartContext.Provider value={{ add, count, openCart: () => setOpen(true) }}>
      {children}
      <ConfigProvider theme={{ token: { colorPrimary: "#7b2cbf", fontFamily: "'Fira Sans', sans-serif" } }}>
      <Drawer
        styles={{
          header: { background: "#f3eafb", color: "#6f42a5", padding: "24px" },
          body: {
            background: "linear-gradient(180deg, #f3eafb 0%, #e6d6f7 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: items.length ? "flex-start" : "center",
          },
          footer: { background: "#e6d6f7" },
        }}
        title={`Giỏ hàng (${count})`}
        open={open}
        onClose={() => setOpen(false)}
        width="45vw"
        footer={
          items.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Tổng: {formatVnd(total)}</strong>
              <Button type="primary">Thanh toán</Button>
            </div>
          )
        }
      >
        {items.length === 0 ? (
          <Empty description={<span style={{ fontSize: 24 }}>Oops..<br />Giỏ hàng hiện đang trống.</span>
          }>
            <Button
              type="primary"
              onClick={() => setOpen(false)}
              style={{ fontSize: 20, height: 48, paddingInline: 23 }}
            >
              Tiếp tục mua sắm
            </Button>
          </Empty>
        ) : (
          <List
            dataSource={items}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button key="remove" type="link" danger onClick={() => remove(item.name)}>
                    Xóa
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<img src={item.image} alt="" width={56} height={56} style={{ objectFit: "cover" }} />}
                  title={item.name}
                  description={
                    <>
                      <div>{item.price}</div>
                      <InputNumber
                        size="small"
                        min={1}
                        value={item.qty}
                        onChange={(v) => v && setQty(item.name, v)}
                        aria-label={`Số lượng ${item.name}`}
                      />
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Drawer>
      </ConfigProvider>
    </CartContext.Provider>
  );
}
