# Pokémon Explorer

## Giới thiệu
Pokémon Explorer là một ứng dụng web cho phép người dùng khám phá thông tin chi tiết về các Pokémon. Ứng dụng cung cấp danh sách Pokémon, các loại (type), biểu đồ tiến hóa, chỉ số cơ bản, và các chi tiết khác được lấy trực tiếp từ API PokéAPI.

---

## Tính năng chính
1. **Danh sách Pokémon**:
   - Hiển thị danh sách Pokémon với thông tin cơ bản.
   - Hỗ trợ cuộn vô hạn (infinite scroll) để tải thêm Pokémon.
   
2. **Tìm kiếm Pokémon**:
   - Tìm kiếm theo tên hoặc ID.
   - Gợi ý tự động với hình ảnh và tên Pokémon.

3. **Chi tiết Pokémon**:
   - Hiển thị hình ảnh chính thức, tên, chỉ số cơ bản, khả năng (abilities), các chiêu thức (moves), chiều cao, cân nặng và kinh nghiệm cơ bản (base experience).
   - Thay đổi nền dựa trên hệ (type) của Pokémon.

4. **Khám phá loại Pokémon (Type)**:
   - Hiển thị danh sách các loại Pokémon với màu sắc và biểu tượng đặc trưng.
   - Chi tiết về các hệ tương khắc, và danh sách Pokémon thuộc loại đó.

5. **Biểu đồ tiến hóa**:
   - Hiển thị chuỗi tiến hóa của Pokémon bằng hình ảnh và tên.

---

## Cách sử dụng
1. **Trang danh sách Pokémon**:
   - Vào trang chính (index.html) để xem danh sách Pokémon.
   - Sử dụng thanh tìm kiếm để tìm Pokémon theo tên hoặc ID.
   - Nhấp vào thẻ Pokémon để xem chi tiết.

2. **Trang chi tiết Pokémon**:
   - Xem thông tin chi tiết về Pokémon được chọn.
   - Duyệt qua biểu đồ tiến hóa và các chiêu thức.

3. **Trang loại Pokémon (Type)**:
   - Khám phá thông tin về các loại Pokémon.
   - Xem danh sách Pokémon theo từng loại và hệ tương khắc.

---

## Cấu trúc dự án
- **HTML Files**:
  - `index.html`: Hiển thị danh sách Pokémon.
  - `detail.html`: Hiển thị thông tin chi tiết của Pokémon.
  - `type.html`: Hiển thị danh sách các loại Pokémon.

- **CSS Files**:
  - `index.css`, `detail.css`, `type.css`: Định kiểu cho từng trang.

- **JavaScript Files**:
  - `index-grid.js`: Quản lý danh sách Pokémon và cuộn vô hạn.
  - `search.js`: Xử lý tìm kiếm Pokémon.
  - `type.js`: Hiển thị thông tin chi tiết về các loại Pokémon.
  - `detail.js`: Xử lý hiển thị chi tiết Pokémon và chuỗi tiến hóa.

---

## Yêu cầu hệ thống
- **Công nghệ sử dụng**:
  - HTML5, CSS3, JavaScript (ES6+)
  - Framework: Bootstrap, Tailwind CSS
  - Thư viện: Axios, PokéAPI
  - Font: Pokémon Hollow, Pokémon Solid

---

## Cách cài đặt
1. **Clone dự án**:
2. **Cài đặt môi trường phát triển**:
- Đảm bảo máy đã cài đặt trình duyệt web hiện đại (Chrome, Firefox, hoặc Edge).

3. **Chạy ứng dụng**:
- Mở các tệp HTML bằng trình duyệt.
- Không cần cấu hình thêm.

---

## Đóng góp
- Nếu bạn muốn đóng góp, hãy tạo **Pull Request** hoặc báo lỗi (Issues) trên GitHub.
- Mọi đóng góp đều được hoan nghênh!

---

## Nguồn dữ liệu
- Dữ liệu Pokémon được lấy từ [PokéAPI](https://pokeapi.co/).

---

## Tác giả
- **Tên**: Tuân Nguyễn
- **Email**: vnprao2002@gmail.com

Cảm ơn bạn đã sử dụng Pokémon Explorer!
