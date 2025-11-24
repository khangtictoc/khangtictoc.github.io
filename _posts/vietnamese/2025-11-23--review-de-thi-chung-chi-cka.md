---
title: Đề thi CKA (Q4 - 2025) - Trải nghiệm như SHIT
author: khangtictoc
date: 2025-11-23 00:34:00 +0800
categories: [Tiếng Việt, Certification, CNCF, CKA]
tags: [kubernetes]
---

> **Lưu ý:** Đây là một bài viết không mấy vui vẻ sau 1 tiếng đồng hồ ngồi tịnh tâm sau khi thi và sau đó bị chó cắn tỉnh lại và lên bài, cân nhắc trước khi đọc.

> Bài viết này không tập trung vào câu hỏi thi, mà chủ yếu là thủ tục và quá trình thi

- [Mở đầu (dành cho newbie)](#mở-đầu-dành-cho-newbie)
- [Ôn luyện (có thể lướt qua)](#ôn-luyện-có-thể-lướt-qua)
- [Trải nghiệm thi (phần chính)](#trải-nghiệm-thi-phần-chính)
  - [Độ khó đề](#độ-khó-đề)
  - [Vài lời cuối](#vài-lời-cuối)

# Mở đầu (dành cho newbie)

Sơ lược về Chứng chỉ CKA (Certified Kubernetes Administrator) có vẻ ai cũng biết rồi, đa số mọi người đều farm cái của của nợ này như một phần chặn đường leo núi để chinh phục **Kubestronaut**, nói thẳng là để có cái chiến lợi phẩm như bên dưới để phông bạt

<p><img src="assets/img/2025/vietnamese/cncf/cka/kubestronaut.png" alt="Kubestronaut" /></p>

Ngắn gọn thì bạn sẽ nhận được:

- Cái áo thương hiệu kube phi hành gia
- Huy hiệu lòe loẹt để khoe
- Truy cập vào private Slack channel hội người anh em cũng lầm lỡ giống mình
- 5 voucher 50% giảm giá để bạn phân phát và lùa gà những người anh em khác
- 20% giảm giá các sự kiện cần mua vé của KubeCon và Kubeday một năm

Ngoài ra bạn còn xứng tên vào danh sách vàng gương mặt tiêu biểu, tham khảo nguồn sau: [Những người Việt Nam vượt khó](https://www.cncf.io/training/kubestronaut/?_sft_lf-country=vn)

Nếu bạn đạt được thành tựu này, tức là có cả kiến thức gần như toàn vẹn về Kubernetes (CKA, CKAD, CKS, KCNA, KCSA), nghĩa là nhà tuyển dụng hay bất kỳ kỹ sư trong nghề sẽ nhìn bạn như một người donate **~50 triệu VND ~> 1835$** (rẻ hơn nếu mua bundle) chỉ để mua con tem hình cái vô lăng dán lên áo 🐸

# Ôn luyện (có thể lướt qua)

Phần này mình không muốn bàn nhiều, vì CKA là đề thi entry cho Kubernetes. Mình đúc kết 1 số tài liệu cho bạn:

**Miễn phí:**

- Youtube:
  - Xem playlist list [CKA-2k25](https://www.youtube.com/playlist?list=PLSsEvm2nF_8nGkhMyD1sq-DqjwQq8fAii) của bác [JayDemy](https://www.youtube.com/@jaydemytech)
- [Killer Shell](https://killer.sh/dashboard): khó hơn xíu đề thi thật, trải nghiệm và giao diện chính xác 99%, làm gatekeeper đánh giá tâm lý đảm bảo bạn sẵn sàng trước khi thi. Đây sẽ là **Simulator Test** khi bạn làm thủ tục đăng ký thi, chọn ngày thi, sau đó muốn làm lúc nào cũng được miễn trước giờ làm bài. Thời điểm hiện tại Killer Shell offers 2 bài kiểm tra thử (Section A và B), khá đáng để làm.

> **Bài học cột sống:** Có thể tìm các câu hỏi đề thi thật theo từ khóa từ những câu hỏi bạn làm trên Killer Shell, sẽ có playlist như trên bao gồm câu hỏi các đề thi thật. Đề càng sát với mốc thời gian bạn gần thi thì càng gần giống tủ. Bằng cách này bạn có thể thi cert và tự học méo tốn một xu nào 😀

- Rất nhiều tài liệu với câu hỏi chính xác đến từ Youtube, đừng search lan man từ những website free lạ có format đề không đúng, câu kéo tăng traffic trang web và phí thời gian của mình. Từ những câu hỏi update real-time trên Ytb, bạn có thể lên [Killer Coda](https://killercoda.com/playgrounds) để hiện thực bài lab

**Tốn phí:**

- KodeCloud (Đề đa dạng đủ dùng, update kiến thức real-time). Có mock test, câu hỏi khá giống với đề thi thật.

Trường hợp của mình thì ban đầu tính không ôn luyện, dựa vào những năm chinh chiến operation trên k8s để đi thi. Nhưng sau khi làm đề Killer Shell (Simulator Test) lần đầu trả kết quả 62%, mình xách háng đi re-book dời lịch thi thêm 1 tuần. 🤖

**Chuẩn bị thi với case của mình - 1 tuần**

- 1/2 Emulator Test (Hoàn thành Section A, Section B đọc lướt xem có câu hỏi nào hay không -> Không làm)
- 3/3 mock exam trên KodeCloud, có thể học trên Udemy: [Certified Kubernetes Administrator (CKA) with Practice Tests](https://udemy.com/course/certified-kubernetes-administrator-with-practice-tests)
- Xem một vài video Youtube đề mới nhất (2025) của bác trên, tầm 5-7 câu hỏi là thấy tự tin ảo tưởng SM rồi.

➡️➡️➡️ Thi thôi !

# Trải nghiệm thi (phần chính)

**Trước khi thi**: mình có đọc kinh nghiệm chia sẻ của 1 bài review trên Viablo: [[CKA] Review kỳ thi CKA và kinh nghiệm xương máu rút ra sau khi thi](https://viblo.asia/p/cka-review-ky-thi-cka-va-kinh-nghiem-xuong-mau-rut-ra-sau-khi-thi-2oKLn2oaLQO)

Bài viết khá hay và chân thật, 1 real Use Case đã xảy ra với bác này. Nói chung mình cũng chuẩn bị tâm lý, 69 tư thế sẵn sàng chuẩn bị đánh trận, ném hết đồ đạc vướng víu trên bàn ra ngoài cửa sổ.

Về thủ tục, chỉ có hình thức online, bạn PHẢI vào phòng thi **PSI Browser (tải về trước)** trước giờ thi 30 phút làm thủ tục, trao đổi với giám thị (proctor) qua khung CHAT, và tuân theo:

- Để không gian bàn trống, không có đồ dùng lạ trên bàn, mình để mỗi chai nước và PHẢI LỘT NHÃN CHAI
- Các thiết bị như tai nghe, bàn phím và chuột rời (nếu xác nhận không dùng) phải để ngoài tầm với
- Quay không gian phòng theo giám thị yêu cầu, một phần của thủ tục trước khi thi khi. Có thể quay bằng điện thoại
- Kê tai sát vào camera đảm bảo ko có thiết bị nghe.
- Giơ CCCD vào camera, sau đó để ra xa ngoài tầm.
- Có 2 options thiết bị làm bài
  - Dùng laptop thì ko được dùng màn hình rời, có thể dùng chuột rời
  - Sử dụng dàn PC, phải có webcam lưu động, cầm tay để quay không gian phòng hoặc quay chỗ điện thoại. Điện thoại sau cùng phải để ngoài tầm tay

Trong lúc làm thủ tục, các bước rất lằng nhằng. Cụ thể:

- Lúc giám thị kêu mình quay mặt bằng, mình đã tinh tế lật pad chuột và đáy laptop lên, chứng minh là không có hạt cát nào dưới đó cả. Vậy mà cứ follow theo quy trình như một khúc củi mất não, vẫn nhắc mình lật 2 món ấy lên. Mà cứ mỗi món lại confirm một lần. Bạn cứ tưởng tượng là timeline diễn ra như này: Nhờ m quay mặt bàn -> Được chưa anh -> Oke em -> Nhờ m lật pad chuột -> Được chưa anh -> Oke em -> Nhờ m lật đít laptop -> Được chưa anh -> Oke em ... Mình tưởng cứ như đang Deja Vu về quá khứ ấy chứ.

- Mọi thứ cứ tiếp diễn như thế cho đến khi vượt qua cả thời điểm book giờ làm bài (không tính trong thời gian làm bài thật), mất thời gian VCL, muốn vô sớm thi sớm mà cứ hoạnh họe cái căn phòng như túp lếu lều của mình

<p><img src="assets/img/2025/vietnamese/cncf/cka/house.png" alt="house" /></p>

- Trong khi làm thủ tục thì sẽ xổ ra một tràng những nội quy cho mình biết, cứ xổ ra tin nhắn liên tục, nhưng khi scan phòng thì chậm như người không não. Cứ tưởng nói chuyện với AI.

Lần đầu thi mình cũng ko biết về chuyện các đường link official được cho phép trong CKA hiển thị ở đâu như [kubernetes.io](https://kubernetes.io) hay [helm.sh](https://helm.sh), mình có hỏi trước điều này. Nhưng mà giám thị trả lời theo kiểu: "Tiết lộ thông tin thi cử là điều cấm kỵ, giám thị không thể hỗ trợ thông tin nhạy cảm liên quan đến đề thi để giúp người làm qua môn". Đến khúc này thì mình mới bắt đầu cảm nhận là thằng giám thị này bị STUPID, mình thề là mình diễn đạt cực dễ hiểu nên không thể hiểu nhầm được, hoặc mình đang nói chuyện với 1 con Bot.

> **Tips nhắc nhở**: Khi vào màn hình làm bài trình duyệt Firefox trên Emulator exam sẽ mở những trang web được whitelist. Bạn có thể review tất cả resources có trong đó.

**Lúc thi:** Vô làm sẽ có UI tour hướng dẫn sơ cho mình, nếu ready thì sẽ nhấn nút `START` để làm bài, sau đó countdown sẽ đếm ngược cho đến khi kết thúc bài thi hoặc mình tự kết thúc sớm.

Trong lúc làm bài, mạng chỗ mình lag, mình có lỡ chửi DUMA bị nhắc 1 lần, thôi thì âu cơ này lỗi từ cá nhân, không sao cứ bình thản làm tiếp. Sau đó có một số trường đoạn mình lẩm bẩm đọc đề -> Nhắc thêm 1 lần nữa, proctor nói thêm phát nữa là mầy cooked! T sẽ terminated exam này. Nghe hết hồn , mình vẫn ôm bụng chửi xàm cứt, nhưng vẫn bình thản im lặng khóa mồm làm tiếp.

Thời gian tiếp tục trôi, lâu lâu mình có tính "xấu" là suy nghĩ hay bỏ tay lên miệng lúc suy nghĩ, nhưng mà cũng 2-3 giây thôi.

<p><img src="assets/img/2025/vietnamese/cncf/cka/thinking.png" alt="thinking" /></p>

Thế là proctor lại ráng gồng cái mồm lên nhắc nhở, kêu không được che mặt. +1 xàm shit, suýt nữa lại mở mồm chửi DUMA. 🔨. Ô hay, vậy khi thi rồi là ong đốt vào cơ mặt vẫn phải gồng đít lên ngồi nhịn à❓

Thế là mình cứ tiếp tục làm, không làm bất cứ hành vi gì lạ, lâu lâu móc mũi nhưng nhớ ông proctor Bot AI thì dừng lại, rồi hoàn thành bài thi, ezy game 🎭.

## Độ khó đề

Bản thân mình thấy đề thi khá dễ, có thể nói là rất dễ nếu bạn đã làm ít nhất 6 tháng đến 1 năm k8s và ôn tủ 1,2 đề + simulator test là thi được. Bài thi 120' nhưng mình làm vẫn dư hơn 30', nói chung là thong thả về độ khó bạn cứ yên tâm về việc đạt được mục tiêu 🎯 66% qua môn.

Điểm cộng:

- Lúc thi sẽ cho 3 lần break time, mỗi lần 15 phút. Nếu bạn cảm thấy ngứa ngáy hay khó chịu gì trong người hãy tận dụng. <Đừng như mình>
- Nếu bị rớt mạng sẽ được reschedule sang lịch mới, đừng như mình chửi thề bị nhắc

Cuối cùng, nếu bị mệt/ốm, đau nhức hay kiến cắn, đảm bảo hãy brainstorm và chuẩn bị vài pài văn mẫu chửi rủa để report lên cho Linux Foundation vì khả năng cao giám thị sẽ không hiểu ngôn từ của bạn và cho bạn rớt ☠️ -> Méo hiểu kiểu gì.

<p><img src="assets/img/2025/vietnamese/cncf/cka/twoface.png" alt="twoface" /></p>

## Vài lời cuối

Thực sự trong quá trình thì contact với proctor quá tệ, bắt bẻ làm mình mất tập trung, giá tiền hiện tại để thi cert CKA là $465 (2025), tức đã tăng giá so với năm ngoái 2024 là $395, nhưng mà chất lượng thì đi ngược. Đôi khi mình hoài nghi proctor là BOT, không phải TOP⚠️.

Linux Foundation là một tổ chức lớn nhưng bố trí kỳ thi rất lạ lùng. Bài viết này công kick công khai nhưng cũng mong nếu nhân viên có đọc được thì nên có sự thay đổi về quy trình, giá tiền hoặc cách thức thi hợp lý, không làm được thì có thể nghỉ việc 😒

Sau cùng thì nếu bạn nào muốn thi CKA thì tiếp tục theo đuổi, kiến thức k8s có thể trau dồi bằng kinh nghiệm và tự học, không cần phải qua thi thố hoặc sách vở 📖. Đôi khi công ty bắt bạn đi thi để làm đẹp hồ sơ, đánh dự án ầm ầm và kiến thức của CKA không phải là đồ bỏ, cũng giúp mình cũng cố và review lại sau quãng thời gian làm việc với cụm tự trị k8s. Nếu bạn hay người thân bạn bè chuẩn bị thi thì hãy ĐỌC BÀI NÀY để hình dung được những viễn cảnh vãi ò có thể xảy ra. 

Chúc các bạn thành công trong kỳ thi này 💖💖💖

_Update thông tin mới nhất: Mình được 86%/66% => PASS ✅ (Không biết sai ở đâu vì mình làm hết, thôi kệ 🙃)_
