# Authenticate Keycloakify (Custom Login UI)

Dự án này là một **Keycloak Theme** tùy chỉnh được xây dựng bằng [Keycloakify](https://keycloakify.dev/), giúp ghi đè giao diện đăng nhập mặc định của Keycloak bằng các công nghệ web hiện đại.

Giao diện được thiết kế theo phong cách **Minimalist (Tối giản - Trắng/Đen)**, tập trung vào trải nghiệm người dùng luồng Đăng nhập (Login). Trang Đăng ký (Register) đã được loại bỏ theo yêu cầu của dự án.

## Công nghệ sử dụng 🛠

-   **Framework**: React 18 + Vite
-   **Theme Engine**: Keycloakify
-   **Styling**: Tailwind CSS v4
-   **UI Components**: shadcn/ui (Radix UI)
-   **Preview Tool**: Storybook

## Cấu trúc tính năng ✨

-   **Đăng nhập (Login)**: Giao diện form đăng nhập tối giản (Username/Email & Password).
-   **Tính năng mở rộng**: Hỗ trợ "Remember me", "Forgot Password".
-   **Social Login**: Tích hợp các nút đăng nhập bằng mạng xã hội (Google, Microsoft, Facebook,...) với thiết kế đồng bộ.
-   **Responsive**: Giao diện tương thích hoàn hảo trên các thiết bị di động và máy tính.

---

## Hướng dẫn cài đặt & Chạy dự án 🚀

### 1. Cài đặt Dependencies

Trước tiên, hãy đảm bảo bạn đã cài đặt Node.js và Yarn (hoặc npm). Mở terminal tại thư mục dự án và chạy:

```bash
yarn install
# hoặc npm install
```

### 2. Xem trước giao diện (Development)

Trong quá trình phát triển UI, cách tốt nhất là sử dụng **Storybook**. Storybook sẽ mô phỏng các trạng thái khác nhau của trang đăng nhập (có/không có lỗi, có mạng xã hội,...) mà không cần phải chạy server Keycloak thực tế.

```bash
npm run storybook
# Mở trình duyệt tại http://localhost:6006
```

### 3. Build Keycloak Theme (.jar)

Sau khi hoàn thiện code UI, bạn cần đóng gói dự án thành một file `.jar` để cài đặt vào Keycloak.

```bash
npm run build-keycloak-theme
```

_Kết quả:_ File `.jar` sẽ được tạo ra trong thư mục `dist_keycloak/`.

### 4. Chạy server Keycloak Local (Bằng Docker)

Dự án có sẵn file cấu hình Docker Compose (`deployment/infra.yml`) để dựng một server Keycloak cục bộ cho mục đích test theme thực tế. **Lưu ý: Bạn cần phải cài đặt Docker.**

-   **Khởi động server Keycloak**:

    ```bash
    yarn infra:start
    ```

    _Keycloak sẽ chạy tại `http://localhost:8080`. Tài khoản Admin mặc định thường là `admin` / `admin` (xem cấu hình trong infra.yml)._

-   **Build theme và Tự động restart server**:
    Lệnh này sẽ build lại code mới nhất ra file `.jar` và khởi động lại Docker container để nhận theme mới.

    ```bash
    yarn infra:build
    ```

-   **Tắt server Keycloak**:
    ```bash
    yarn infra:stop
    ```

---

## Lưu ý kĩ thuật ⚠️

-   Giao diện chính xác của trang đăng nhập được code tại file `src/login/pages/Login.tsx`, bọc trong layout `src/login/Template.tsx`.
-   Các cấu hình màu sắc UI (Đen trắng tối giản) được định nghĩa tại `src/login/index.css` (Tailwind CSS v4 variables).
-   Nếu bị lỗi mạng hoặc lỗi `EOFException` của Maven trong lúc build `.jar`, hãy xóa thư mục `node_modules/.cache/keycloakify/.m2` và chạy build lại.
