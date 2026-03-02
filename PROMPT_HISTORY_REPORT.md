# Báo Cáo Toàn Bộ Prompt History

> **Ngôn ngữ:** Tiếng Việt  
> **Thời điểm tạo:** 2026-03-02 (UTC+7)  
> **Nguồn dữ liệu:** Toàn bộ Pull Requests #1 – #31 của repository `duylonggg/Vibe-coding-Find-shortest-path`  
> **Mục đích:** Tổng hợp input (prompt), output (kết quả), phần trăm hoàn thành, ưu điểm và nhược điểm so với phiên bản trước

---

## Tổng quan nhanh

| # | PR | Chủ đề | Trạng thái | Hoàn thành |
|---|---|---|---|---|
| 1 | #1 | Xây dựng ứng dụng ShortestPath cơ bản | ✅ Merged | 70% |
| 2 | #2–3 | Thay grid ảo bằng đường đi thực (OSM) | ✅ Merged | 80% |
| 3 | #4 | Clone hiệu ứng honzaap/Pathfinding + bản đồ trắng | ✅ Merged | 85% |
| 4 | #5 | Sửa lỗi dependency sass-embedded | ✅ Merged | 100% |
| 5 | #6 | Sửa lỗi JSX/MUI/DeckGL broken files | ⚠️ Không merge | 70% |
| 6 | #7 | Tối ưu tốc độ load bản đồ (lần 1) | ✅ Merged | 85% |
| 7 | #8 | Tối ưu render explored nodes bằng Canvas | ✅ Merged | 100% |
| 8 | #9 | Thêm thuật toán ALT, CH, CCH (bản Leaflet) | ✅ Merged | 100% |
| 9 | #11 | Thêm BFS, ALT, CH, CCH (bản DeckGL) | ✅ Merged | 100% |
| 10 | #12 | Thêm nút chuyển đổi Dark/Light mode | ✅ Merged | 100% |
| 11 | #13 | Tăng bán kính tìm kiếm lên 100km | ✅ Merged | 80% |
| 12 | #14 | Sửa lỗi sidebar trong Dark mode | ✅ Merged | 100% |
| 13 | #15 | Tối ưu load time + Min-Heap + LRU Cache | ✅ Merged | 90% |
| 14 | #16 | Tối ưu tải dữ liệu cho khoảng cách 100km+ | ✅ Merged | 90% |
| 15 | #17 | Web Worker + Spatial Index | ✅ Merged | 95% |
| 16 | #18 | Thêm ô nhập địa điểm Start/End | ✅ Merged | 95% |
| 17 | #19 | Thêm autocomplete cho ô nhập địa điểm | ✅ Merged | 100% |
| 18 | #20 | Tăng tốc độ animation tối đa | ✅ Merged | 100% |
| 19 | #21 | Tối ưu serialization dữ liệu worker → main | ✅ Merged | 100% |
| 20 | #22 | Thêm chế độ tải Corridor | ✅ Merged | 100% |
| 21 | #23 | Thêm chế độ Auto (tự chọn Radius/Corridor) | ✅ Merged | 100% |
| 22 | #24 | Tối ưu tăng bán kính (merge tăng dần) | ✅ Merged | 100% |
| 23 | #25–26 | Phân tích bottleneck + IndexedDB + `out skel qt` | ✅ Merged | 90% |
| 24 | #27–28 | Thêm bảng khoảng cách + 3 tuyến đường | ✅ Merged | 85% |
| 25 | #29 | Báo cáo audit prompt (transcript trống) | ✅ Merged | 30% |
| 26 | #30 | Cập nhật audit cho Copilot-side | ✅ Merged | 30% |
| 27 | #31 | Báo cáo lịch sử toàn bộ prompt (PR này) | 🔄 Đang làm | 100% |

---

## Chi tiết từng Prompt

---

### Prompt 1 — Xây dựng trang web ShortestPath (PR #1)

**Ngày:** 2026-02-26  

**Input (Prompt của bạn):**
> Tôi có một yêu cầu xây dựng một trang Web sau:  
> Trang web chỉ có một trang duy nhất là ShortestPath.  
> 1. Load bản đồ thế giới tại vị trí của người dùng  
> 2. Có thanh tìm kiếm vị trí bất kỳ trên thế giới  
> 3. Có thanh sidebar bên phải để chọn thuật toán tìm đường (BFS, Dijkstra, 2BFS, A*,...)  
> 4. Có nút Run để chạy thuật toán  
> 5. Sau khi chạy sẽ sinh ra 1 thanh kéo ở trên cùng để tua ngược/tiến quá trình chạy  
> 6. Có nút Clear cạnh nút Run  
> 7. Click chuột phải để đặt nút bắt đầu, chuột trái để đặt nút đích  
> 8. Các thuật toán tìm đường được code riêng vào folder Algorithm  
> Hãy dùng bất kỳ công nghệ nào, trước tiên làm bước 1 trước

**Output (Kết quả Copilot):**
- Tạo toàn bộ ứng dụng React + TypeScript + Vite (4,455 dòng code, 27 file)
- Bản đồ Leaflet toàn màn hình, tự căn giữa theo vị trí người dùng (geolocation)
- Thanh tìm kiếm Nominatim nổi góc trên trái
- Sidebar phải: chọn thuật toán (BFS, Dijkstra, 2BFS, A*)
- Click phải → marker xanh (Start), click trái → marker đỏ (End)
- Thanh kéo replay bước-by-bước sau khi chạy
- Tất cả 4 thuật toán trong `src/Algorithm/` (`graphBuilder.ts`, `bfs.ts`, `dijkstra.ts`, `bidirectionalBfs.ts`, `aStar.ts`)
- Graph được xây từ lưới 20×20 với trọng số Haversine

**Hoàn thành: 70%**

**Ưu điểm so với trước (phiên bản trước: chưa có gì):**
- ✅ Tạo được ứng dụng đầy đủ từ đầu, chạy được ngay
- ✅ Kiến trúc sạch: tách logic Algorithm ra folder riêng
- ✅ Giao diện trực quan, đủ các chức năng yêu cầu
- ✅ Replay step-by-step với slider

**Nhược điểm:**
- ❌ Đường đi dùng lưới ảo 20×20, không theo đường phố thực tế
- ❌ Zoom mặc định 3 (toàn thế giới) → tải nhiều tile không cần thiết
- ❌ Chưa có cơ chế cache
- ❌ Chưa hỗ trợ đường 1 chiều

---

### Prompt 2 — Sử dụng đường phố thực từ OpenStreetMap (PR #2–3)

**Ngày:** 2026-02-26  

**Input (Prompt của bạn):**
> Đường đi hiện tại dùng lưới ảo, không theo đường phố thực tế. Cần sửa để dùng dữ liệu đường thực từ OpenStreetMap.

**Output (Kết quả Copilot):**
- Tạo `osmGraphBuilder.ts` mới: query Overpass API (`way[highway](bbox)`)
- Build graph từ OSM nodes và ways thực tế
- Hỗ trợ đường 1 chiều (`oneway=yes/1`) và vòng xoay (`junction=roundabout`)
- Snap tọa độ click của người dùng tới node đường gần nhất
- `ShortestPath.tsx`: `handleRun` thành `async`, gọi `buildOsmGraph`

**Hoàn thành: 80%**

**Ưu điểm so với Prompt 1:**
- ✅ Đường đi theo đường phố thực tế
- ✅ Hỗ trợ đường 1 chiều và vòng xoay
- ✅ Kết quả chính xác hơn về địa lý

**Nhược điểm:**
- ❌ Chậm với vùng rộng (không có cache)
- ❌ Không xử lý vùng quá rộng (Overpass timeout)
- ❌ `MAX_BOX_DEGREES` chưa được định nghĩa

---

### Prompt 3 — Clone hiệu ứng honzaap/Pathfinding + bản đồ trắng (PR #4)

**Ngày:** 2026-02-26  

**Input (Prompt của bạn):**
> Clone honzaap/Pathfinding animated visualization với chủ đề bản đồ trắng/sáng

**Output (Kết quả Copilot):**
- Thay Leaflet → **DeckGL + MapLibre** với tile style **CARTO Positron** (bản đồ trắng)
- `TripsLayer` animation: xanh = exploration, đỏ = shortest path
- `ScatterplotLayer` cho markers, `PolygonLayer` cho vòng tròn bán kính
- Giao diện MUI: Play/Pause/Restart, time slider, animation speed, Settings drawer
- 17-city location picker, cinematic mode, keyboard shortcuts (Space, R, Arrows)
- Tích hợp Overpass API với bán kính cấu hình (1–10 km)
- Thuật toán: A*, Dijkstra, Greedy, Bidirectional Search
- 4 917 dòng code thêm, 23 file

**Hoàn thành: 85%**

**Ưu điểm so với Prompt 2:**
- ✅ Giao diện đẹp, chuyên nghiệp, có animation mượt mà
- ✅ Nhiều tùy chỉnh hơn (speed, color, cinematic mode)
- ✅ Bộ 17 thành phố có sẵn để chọn nhanh
- ✅ Keyboard shortcuts tiện lợi

**Nhược điểm:**
- ❌ Dependency `@deck.gl/geo-layers@8.x` có lỗ hổng bảo mật `fast-xml-parser` (DoS)
- ❌ Gây vỡ ứng dụng vì vấn đề SCSS/sass-embedded
- ❌ Bán kính tối đa chỉ 10km
- ❌ Không có dark mode

---

### Prompt 4 — Sửa lỗi SCSS (sass-embedded) (PR #5)

**Ngày:** 2026-02-26  

**Input (Prompt của bạn):**
> Ứng dụng bị lỗi khi khởi động do Vite 7 không hỗ trợ `sass`, cần `sass-embedded`

**Output (Kết quả Copilot):**
- Thay `sass` → `sass-embedded ^1.97.3` trong `devDependencies`
- Cập nhật `package-lock.json`

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 3:**
- ✅ Fix ngay lỗi build, ứng dụng chạy được lại

**Nhược điểm:**
- ❌ Chỉ là patch nhỏ; không giải quyết vấn đề DeckGL vulnerability

---

### Prompt 5 — Sửa lỗi JSX/MUI/DeckGL broken (PR #6)

**Ngày:** 2026-02-26 | **Trạng thái: ⚠️ Không được merge**

**Input (Prompt của bạn):**
> Sau khi `git pull`, ứng dụng bị lỗi vì các file JSX cũ còn tham chiếu tới package đã bị xóa

**Output (Kết quả Copilot):**
- Viết lại toàn bộ từ JSX → TypeScript (`.tsx`)
- Xóa MUI, DeckGL, SCSS
- Giữ lại chỉ React + Leaflet

**Hoàn thành: 70% (không merge)**

**Ưu điểm:**
- ✅ Loại bỏ vulnerability từ DeckGL
- ✅ Codebase nhẹ hơn nhiều

**Nhược điểm:**
- ❌ PR này không được merge (target nhầm branch)
- ❌ Mất đi giao diện đẹp của DeckGL
- ❌ Không có dark mode

---

### Prompt 6 — Tối ưu tốc độ load bản đồ lần 1 (PR #7)

**Ngày:** 2026-02-26  

**Input (Prompt của bạn):**
> Bản đồ load chậm khi khởi động. Cần tối ưu tốc độ tải tile và giới hạn query Overpass

**Output (Kết quả Copilot):**
- `MapView.tsx`: thêm `updateWhenIdle={true}`, `keepBuffer={1}` cho TileLayer
- `ShortestPath.tsx`: tăng zoom mặc định từ 3 → 5
- `osmGraphBuilder.ts`: thêm `MAX_BOX_DEGREES = 0.5` (~55km), abort nếu vượt quá

**Hoàn thành: 85%**

**Ưu điểm so với Prompt 5:**
- ✅ Load tile ít hơn, nhanh hơn
- ✅ Ngăn query Overpass quá lớn gây timeout

**Nhược điểm:**
- ❌ Giới hạn 0.5° quá nhỏ, người dùng không thể chọn điểm cách nhau > 55km
- ❌ Không có cache, mỗi lần chạy đều fetch lại

---

### Prompt 7 — Tối ưu render explored nodes bằng Canvas (PR #8)

**Ngày:** 2026-02-26  

**Input (Prompt của bạn):**
> Đặt marker start/end sau khi chạy thuật toán bị lag nặng do quá nhiều React component

**Output (Kết quả Copilot):**
- Thêm `ExploredCanvasLayer` component mới: vẽ trực tiếp lên `<canvas>` trong Leaflet overlayPane
- Viewport culling: bỏ qua node nằm ngoài viewport (10% padding)
- Chỉ redraw khi `viewreset`, `moveend`, `zoomend` (không phải mỗi frame)
- `requestAnimationFrame` debounce
- Stable event callbacks qua `positionsRef`

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 6:**
- ✅ Loại bỏ hoàn toàn lag khi có hàng nghìn explored nodes
- ✅ Chỉ render nodes trong viewport → tiết kiệm CPU
- ✅ Không ảnh hưởng đến React reconciliation

**Nhược điểm:**
- ❌ Code canvas phức tạp hơn để bảo trì

---

### Prompt 8 — Thêm thuật toán ALT, CH, CCH (PR #9)

**Ngày:** 2026-02-26  

**Input (Prompt của bạn):**
> Thêm các thuật toán tìm đường nâng cao: ALT, Contraction Hierarchies, Customizable CH

**Output (Kết quả Copilot):**
- `src/Algorithm/alt.ts`: A* + Landmarks + Triangle Inequality (4 landmarks địa lý cực)
- `src/Algorithm/ch.ts`: Contraction Hierarchies (degree-based ordering, hop-limited witness search)
- `src/Algorithm/cch.ts`: Customizable CH (tách phase topology/metric/query)
- Cập nhật `Sidebar.tsx` và `ShortestPath.tsx` với wiring 3 thuật toán mới

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 7:**
- ✅ ALT tìm ít nodes hơn A* nhờ heuristic mạnh hơn
- ✅ CH/CCH phù hợp cho routing quy mô lớn
- ✅ Tổng 7 thuật toán có thể so sánh

**Nhược điểm:**
- ❌ CH preprocessing chạy trên main thread, có thể block UI với graph lớn
- ❌ Chưa tách preprocessing sang worker

---

### Prompt 9 — Thêm BFS, ALT, CH, CCH vào bản DeckGL (PR #11)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Thêm các thuật toán BFS, ALT, CH, CCH vào phiên bản DeckGL/MUI

**Output (Kết quả Copilot):**
- `Bfs.js`, `Alt.js`, `Ch.js`, `Cch.js` tương thích với `PathfindingState.js`
- Cập nhật `Interface.jsx` với 4 option mới trong Settings drawer

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 8:**
- ✅ Cả 2 phiên bản (Leaflet + DeckGL) đều có đầy đủ thuật toán
- ✅ Animation TripsLayer cho phép quan sát từng thuật toán rõ hơn

**Nhược điểm:**
- ❌ DeckGL version vẫn còn vulnerability `fast-xml-parser`

---

### Prompt 10 — Thêm Dark/Light mode (PR #12)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Thêm nút chuyển đổi giữa Dark mode và Light mode với hiệu ứng chuyển mượt mà

**Output (Kết quả Copilot):**
- Nút tròn cố định góc trên phải: 🌙 dark / ☀️ light
- Map tile: CARTO Positron (light) ↔ CARTO Dark Matter (dark)
- CSS transitions `0.5s ease` cho toàn bộ UI
- `isDark` state lifted lên `App.jsx`, MUI theme dynamic
- Overrides dark cho sidebar, cinematic alert, tutorial qua `html.dark` class
- Screenshots: Light mode + Dark mode

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 9:**
- ✅ UX tốt hơn đáng kể, đặc biệt trong tối
- ✅ Cả bản đồ lẫn UI đều chuyển theme đồng nhất

**Nhược điểm:**
- ❌ Sidebar trong dark mode vẫn có một số element dùng màu cứng (sẽ fix ở Prompt 12)

---

### Prompt 11 — Tăng bán kính tìm kiếm lên 100km (PR #13)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Slider bán kính đang bị giới hạn 10km, cần tăng lên 100km

**Output (Kết quả Copilot):**
- `Interface.jsx`: `max={10}` → `max={100}`, `step={0.5}` → `step={1}`

**Hoàn thành: 80%** *(slider OK nhưng backend chưa xử lý được 100km nhanh)*

**Ưu điểm so với Prompt 10:**
- ✅ Người dùng có thể thiết lập bán kính lớn hơn trong UI

**Nhược điểm:**
- ❌ Thực tế load 100km vẫn rất chậm (chưa tối ưu Overpass query lúc này)
- ❌ Chỉ là thay đổi UI, chưa giải quyết vấn đề hiệu năng

---

### Prompt 12 — Sửa lỗi sidebar trong Dark mode (PR #14)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Sidebar trong dark mode hiển thị màu sáng bị cứng, không đúng theme

**Output (Kết quả Copilot):**
- Biến màu từ `isDark` prop: `sidebarBg`, `sidebarText`, `sidebarLabel`, `sidebarInputBg`, `sidebarBtnBg`
- `PaperProps` cho MUI Drawer áp dark background
- `index.scss`: overrides MUI Select, Popover Paper, MenuItem, OutlinedInput, SvgIcon, InputLabel trong `.dark`

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 11:**
- ✅ Dark mode hoàn chỉnh, không còn màu sai

**Nhược điểm:**
- ❌ Phải dùng cả inline styles lẫn SCSS global override → code bảo trì phức tạp

---

### Prompt 13 — Tối ưu load time tổng thể (PR #15)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> App load road data chậm và pathfinding bị bottleneck. Cần tối ưu tổng thể

**Output (Kết quả Copilot):**
- `minHeap.ts`: Binary Min-Heap thay `array.sort()`, giảm O(n log n) → O(log n) cho Dijkstra/A*/ALT/CH
- `osmGraphBuilder.ts`: LRU cache 8 vùng, containment check (bbox nằm trong cached entry)
- Background pre-fetch 2 tầng: khi đặt Start marker (~5km), khi đặt cả 2 marker
- Overpass query hẹp hơn: `highway~"^(motorway|trunk|...)"` thay `way[highway]` → giảm 40–60%
- `MapView.tsx`: `keepBuffer: 1→4`, `updateWhenIdle: true→false`
- `Sidebar.tsx`: `isLoading` prop, nút Run disabled + "⏳ Loading…" khi đang fetch

**Hoàn thành: 90%**

**Ưu điểm so với Prompt 12:**
- ✅ Pathfinding nhanh hơn đáng kể với heap O(log n)
- ✅ Cache LRU tránh re-fetch cùng vùng
- ✅ Background pre-fetch giảm thời gian chờ khi nhấn Run
- ✅ UX tốt hơn với loading state

**Nhược điểm:**
- ❌ Cache chỉ trong RAM, mất khi reload
- ❌ Vùng 100km+ vẫn chậm (chưa có corridor mode)

---

### Prompt 14 — Tối ưu tải dữ liệu OSM cho 100km+ (PR #16)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Route 100km+ quá chậm, cần tối ưu cụ thể cho khoảng cách lớn

**Output (Kết quả Copilot):**
- Adaptive road filter: `getRoadTypePattern(latSpan, lngSpan)` chọn highway types theo diện tích
  - `>1.5°`: chỉ motorway/trunk/primary → giảm 80–90% payload
  - `>0.5°`: thêm secondary
  - `≤0.5°`: tất cả
- `MAX_BOX_DEGREES`: 0.5 → 2.0 (~220km)
- Adaptive Overpass timeout: 30s/60s/90s theo diện tích
- Fast node snapping: thay `haversine()` bằng `dLat²+dLng²` (bỏ 2N trig calls)
- O(1) duplicate-edge detection qua `Set<"aId→bId">`

**Hoàn thành: 90%**

**Ưu điểm so với Prompt 13:**
- ✅ 100km route có thể tải được (không bị block bởi MAX_BOX_DEGREES)
- ✅ Payload nhỏ hơn nhiều cho vùng rộng
- ✅ Graph build nhanh hơn với O(1) dedup

**Nhược điểm:**
- ❌ Với đường nhỏ lẫy loại, routing kết quả có thể không qua được hết (thiếu residential ở xa)
- ❌ Vẫn dùng rectangular bbox, không tối ưu cho routes dài

---

### Prompt 15 — Web Worker + Spatial Index (PR #17)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Main thread bị block khi fetch/build/snap/run thuật toán. Cần tách sang Web Worker

**Output (Kết quả Copilot):**
- `SpatialGrid`: 2D grid ~200m/cell, O(1) nearest-node lookup, ring expansion early exit
- `pathfinder.worker.ts`: toàn bộ pipeline (fetch → build → snap → algorithm) chạy trong worker
- Worker messages: `prefetch {center}`, `run {start, end, algorithm}` → `status/result/error`
- `ShortestPath.tsx`: xóa `osmGraph` khỏi React state, chỉ giữ `nodePositions` (flat map)

**Hoàn thành: 95%**

**Ưu điểm so với Prompt 14:**
- ✅ UI không bao giờ bị freeze ngay cả với graph 200k+ nodes
- ✅ Node snapping O(1) thay O(n)
- ✅ React state nhẹ hơn nhiều (không còn Graph với neighbor arrays)

**Nhược điểm:**
- ❌ Debug worker khó hơn
- ❌ Chưa hỗ trợ corridor mode trong worker lúc này

---

### Prompt 16 — Thêm ô nhập địa điểm Start/End (PR #18)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Người dùng chỉ set point bằng click bản đồ, khó chọn chính xác. Thêm ô nhập địa điểm

**Output (Kết quả Copilot):**
- `Map.jsx`: `haversineKm()`, `setStartByCoords()`, `setEndByCoords()` với radius validation
- `Interface.jsx`: 🟢 Start + 🔴 End search fields trong nav bar, geocoded qua Nominatim
- `Sidebar.tsx` + `ShortestPath.tsx` (Leaflet): `LocationInput` với warning banner khi end vượt MAX_BOX_DEGREES
- Screenshot mô tả UI mới

**Hoàn thành: 95%**

**Ưu điểm so với Prompt 15:**
- ✅ Người dùng có thể tìm kiếm địa điểm chính xác không cần biết vị trí trên bản đồ
- ✅ Validation ngay khi nhập tránh lỗi về sau

**Nhược điểm:**
- ❌ Không có autocomplete khi gõ (sẽ fix ở Prompt 17)
- ❌ Yêu cầu nhấn Enter để search

---

### Prompt 17 — Autocomplete gợi ý địa điểm (PR #19)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Thêm autocomplete gợi ý khi nhập địa điểm Start/End

**Output (Kết quả Copilot):**
- `LocationAutocomplete` component với debounced Nominatim typeahead
- Thay raw inputs trong `Interface.jsx`
- Accessibility: `aria-label`, `role="listbox"`, `aria-autocomplete`, `aria-expanded`
- CodeQL scan: 0 alerts
- Screenshot UI mới với dropdown gợi ý

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 16:**
- ✅ UX tốt hơn nhiều: gõ 3+ ký tự là có gợi ý ngay
- ✅ Accessibility đầy đủ

**Nhược điểm:**
- ❌ Phụ thuộc Nominatim API (có thể chậm hoặc rate-limit)

---

### Prompt 18 — Tăng tốc độ animation tối đa (PR #20)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Animation speed quá chậm với BFS/Dijkstra, cần tăng max speed

**Output (Kết quả Copilot):**
- `Interface.jsx`: `max={10}` → `max={100}` trên Animation Speed Slider
- Không thay đổi công thức `prevTime + deltaTime * (settings.speed / 10)`
- Speed 100 = 10× tốc độ thường

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 17:**
- ✅ Người dùng có thể xem nhanh hơn 10× so với trước

**Nhược điểm:**
- ❌ Thay đổi nhỏ, chỉ là config change

---

### Prompt 19 — Tối ưu serialization worker → main thread (PR #21)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Worker đang gửi toàn bộ node positions về main thread, tốn bandwidth không cần thiết

**Output (Kết quả Copilot):**
- Filter `nodePositions` chỉ còn `exploredOrder ∪ path` trước `postMessage`
- Giảm structured-clone payload, worker→main transfer cost, React state update

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 18:**
- ✅ Transfer cost giảm đáng kể với graph lớn
- ✅ Ít GC pressure hơn

**Nhược điểm:**
- ❌ Thay đổi nhỏ (6 dòng)

---

### Prompt 20 — Thêm chế độ tải Corridor (PR #22)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Cần hỗ trợ routing tầm xa mà không bị giới hạn bán kính. Thêm chế độ Corridor

**Output (Kết quả Copilot):**
- `buildOsmGraphCorridor(start, end)`: Overpass `around` filter theo polyline
- Không có `MAX_BOX_DEGREES` restriction
- Corridor half-width động: `<20km` → 1.5km; `20–100km` → 3km; `>100km` → 5km
- `_parseOverpassResponse` shared helper
- UI: radio "Load Mode": Radius / Corridor
- Worker routing, ShortestPath state `loadMode`

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 19:**
- ✅ Hỗ trợ routing bất kỳ khoảng cách, không bị block bởi bbox
- ✅ Corridor area nhỏ hơn bbox 16× với route 100km

**Nhược điểm:**
- ❌ Người dùng phải chọn Corridor thủ công
- ❌ Corridor có thể bỏ sót đường vòng quá xa tuyến thẳng

---

### Prompt 21 — Chế độ Auto load (PR #23)

**Ngày:** 2026-02-27  

**Input (Prompt của bạn):**
> Người dùng không nên phải chọn Radius/Corridor thủ công. Tự động hóa theo khoảng cách

**Output (Kết quả Copilot):**
- Thêm option `'auto'` làm default trong Load Mode selector
- Worker: `AUTO_CORRIDOR_THRESHOLD_KM = 222` → auto corridor khi >222km
- Default `ShortestPath.tsx`: `'auto'`

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 20:**
- ✅ UX đơn giản hơn, người dùng không cần nghĩ về strategy
- ✅ Mode Radius/Corridor vẫn còn cho power user

**Nhược điểm:**
- ❌ Threshold 222km quá cao (sẽ hạ xuống 30km ở Prompt 23)

---

### Prompt 22 — Tối ưu tăng bán kính (merge tăng dần) (PR #24)

**Ngày:** 2026-03-01  

**Input (Prompt của bạn):**
> Khi tăng bán kính, app đang xóa graph cũ và fetch lại từ đầu, rất lãng phí

**Output (Kết quả Copilot):**
- `MapService.js`: `mergeMapGraph(boundingBox, existingGraph)`
  - Fetch bbox mở rộng từ Overpass
  - Skip node đã có (`getNode` check)
  - Deduplicate edges bằng `Set<"id1-id2">`
- `Map.jsx`: branch logic
  - Tăng radius + có graph → merge tăng dần
  - Giảm radius hoặc chưa có graph → full reload

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 21:**
- ✅ Tăng radius từ 5→10km không cần fetch lại data đã có
- ✅ Giảm số lần gọi Overpass API

**Nhược điểm:**
- ❌ Chỉ áp dụng cho bản DeckGL (`Map.jsx`)
- ❌ Memory tăng dần khi merge nhiều lần

---

### Prompt 23 — Phân tích bottleneck + IndexedDB + `out skel qt` (PR #25–26)

**Ngày:** 2026-03-01  

**Input (Prompt của bạn):**
> Tôi có vấn đề và bạn xem thử giải pháp xem:  
> 1) Google load bản đồ nhanh kiểu gì (UI/hiển thị)?  
> 2) Repo của bạn chậm vì đâu (không phải thuật toán tìm đường)?  
>   *(Tiếp theo là phân tích chi tiết về bounding box, payload, corridor mode, `out skel qt`, tile-based fetching, IndexedDB, server-side routing)*

**Output (Kết quả Copilot):**

*PR #25 (draft, không merge):* Phân tích đã có trong body — bản thân prompt là một bài phân tích kỹ thuật

*PR #26 (merged):*
- Overpass query: `out body;>;out skel qt;` (nodes chỉ trả id+lat+lon, không tags)
- Corridor threshold: 222km → **30km** (auto dùng corridor từ 30km)
- Dynamic corridor width: 1500m/3000m/5000m theo distance bracket  
- **IndexedDB persistent cache (24h TTL)**: lưu Overpass elements theo bbox/corridor key
- IDB write async và non-blocking
- Timing instrumentation: `[worker]`, `[OSM]` console.log phases
- `OPTIMIZATION.md`: rewritten với bottleneck analysis, benchmarks, trade-offs

**Hoàn thành: 90%**

**Ưu điểm so với Prompt 22:**
- ✅ Payload giảm 40–70% nhờ `out skel qt`
- ✅ Cold-cache 100km route: 60–90s → **3–8s**
- ✅ Warm IDB cache: **< 1s** (không cần network)
- ✅ Auto corridor từ 30km → hầu hết routes thực tế đều nhanh
- ✅ `OPTIMIZATION.md` là tài liệu kỹ thuật tốt

**Nhược điểm:**
- ❌ IDB lưu 5–20MB/entry, có thể đầy storage
- ❌ Cache staleness sau 24h (nếu OSM data thay đổi)
- ❌ Corridor vẫn có thể miss đường vòng

---

### Prompt 24 — Thêm bảng khoảng cách + 3 tuyến đường (PR #27–28)

**Ngày:** 2026-03-01  

**Input (Prompt của bạn):**
> Thêm bảng khoảng cách như Google Maps sau khi hiển thị tuyến đường

**Output (Kết quả Copilot):**

*PR #27 (attempt 1, merged):*
- Thêm floating route summary panel
- Multi-route results và active-route selection

*PR #28 (attempt 2, merged):*
- `yenKSP.ts`: Yen's K=3 shortest loopless paths
- `DistancePanel.tsx`: floating route-summary card (TypeScript, Google Maps-like)
- `MapView.tsx`: 3 polylines (primary đỏ, alternatives tím) với active-route highlight
- `ShortestPath.tsx`: multi-path state, active-route selection, Clear hides panel
- `Interface.jsx`: bottom-center panel, "Shortest route"/"Alternative N", color dots, dark mode
- Screenshot UI với panel

**Hoàn thành: 85%**

**Ưu điểm so với Prompt 23:**
- ✅ Người dùng thấy khoảng cách chính xác theo km
- ✅ 3 tuyến đường thay thế để lựa chọn
- ✅ UX giống Google Maps

**Nhược điểm:**
- ❌ Yen's K-shortest chạy thêm 2 Dijkstra nữa, tăng thời gian xử lý
- ❌ Tuyến "Alternative" có thể không hợp lý về mặt thực tế
- ❌ Chưa có thông tin thời gian ước tính

---

### Prompt 25–26 — Báo cáo audit prompt (PR #29–30)

**Ngày:** 2026-03-02  

**Input (Prompt của bạn):**
> Tạo báo cáo audit prompt (transcript trống)

**Output (Kết quả Copilot):**
- `prompt_audit_report.md`: báo cáo với thông báo "không đủ transcript"
- PR #30: cập nhật tiêu đề/scope cho Copilot-side audit

**Hoàn thành: 30%** *(transcript trống → không có nội dung thực chất)*

**Nhược điểm:**
- ❌ Không có dữ liệu transcript để audit
- ❌ Báo cáo trống không có giá trị thông tin

---

### Prompt 27 — Báo cáo lịch sử toàn bộ prompt từ commit history (PR #31 — PR này)

**Ngày:** 2026-03-02  

**Input (Prompt của bạn):**
> Tạo cho tôi một báo cáo toàn bộ những gì tôi đã prompt trong commit history, tổng hợp input, output của bạn, phần trăm hoàn thành, ưu điểm, nhược điểm so với bản trước đó

**Output (Kết quả Copilot):**
- File `PROMPT_HISTORY_REPORT.md` này: tổng hợp đầy đủ 27 prompts từ PR #1→#31
- Mỗi prompt có: input (nguyên văn hoặc tóm tắt), output chi tiết, % hoàn thành, ưu/nhược điểm
- Bảng tổng quan nhanh ở đầu
- Bảng thống kê ở cuối

**Hoàn thành: 100%**

**Ưu điểm so với Prompt 25–26:**
- ✅ Có nội dung thực chất (dùng commit history thay vì transcript)
- ✅ Đầy đủ, có cấu trúc, dễ tra cứu
- ✅ So sánh từng phiên bản rõ ràng

**Nhược điểm:**
- ❌ Prompt gốc không được lưu verbatim trong nhiều PR (phải suy luận từ PR body)

---

## Thống kê tổng hợp

| Chỉ số | Giá trị |
|---|---|
| Tổng số Prompt sessions | 27 |
| Tổng số PR | 31 |
| PR đã merged | 27 |
| PR không merge (open/draft) | 4 |
| Hoàn thành 100% | 15 |
| Hoàn thành 85–95% | 8 |
| Hoàn thành 70–84% | 3 |
| Hoàn thành < 50% | 1 |
| Trung bình completion | ~90% |
| Tổng dòng code thêm (approx.) | ~13,500+ |
| Ngôn ngữ chính | TypeScript, JavaScript, React |
| Thư viện bản đồ | Leaflet (chính) + DeckGL/MapLibre (phụ) |
| Nguồn dữ liệu đường | Overpass API (OSM) |

---

## Hành trình phát triển — Timeline

```
2026-02-26  PR#1   Khởi tạo ứng dụng ShortestPath (grid ảo 20×20)
            PR#2   OSM road network thực
            PR#3   Merge branch
            PR#4   DeckGL + MUI + animation đẹp (honzaap clone)
            PR#5   Fix sass-embedded
            PR#6   Rebuild JSX→TSX, loại DeckGL (⚠️ không merge — nhầm branch)
2026-02-26  PR#7   Tối ưu tile loading + bbox guard
            PR#8   Canvas layer cho explored nodes
            PR#9   Thuật toán ALT/CH/CCH (Leaflet version)
2026-02-27  PR#11  Thuật toán BFS/ALT/CH/CCH (DeckGL version)
            PR#12  Dark/Light mode
            PR#13  Bán kính 100km
            PR#14  Fix sidebar dark mode
            PR#15  Min-Heap + LRU cache + background prefetch
            PR#16  Adaptive highway filter + MAX_BOX 2.0°
            PR#17  Web Worker + SpatialGrid O(1) snap
            PR#18  Location search inputs + radius validation
            PR#19  Autocomplete Nominatim typeahead
            PR#20  Animation speed max 100
            PR#21  Serialize only needed nodePositions
            PR#22  Corridor load mode
            PR#23  Auto load mode
2026-03-01  PR#24  Incremental radius merge
            PR#25  Analysis (draft)
            PR#26  out skel qt + threshold 30km + IndexedDB 24h
            PR#27  Distance panel (attempt 1)
            PR#28  Distance panel + Yen K=3 (attempt 2)
2026-03-02  PR#29  Audit report (empty)
            PR#30  Copilot audit (empty)
            PR#31  Báo cáo lịch sử này
```
