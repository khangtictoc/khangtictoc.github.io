---
title: Đề thi CKS (Q1 - 2025) - Bài thi cảm xúc (Part 4)
author: khangtictoc
date: 2026-03-23 00:34:00 +0800
categories: [Tiếng Việt, Certification, CNCF, Kubestronaut]
tags: [kubernetes]
---

# Mở đầu

## Đánh giá chung

- Đây là đề thi hand-ons labs trên environment Kubernetes, chuyên môn chính về hầu như toàn bộ Security trên K8s
- Khó hơn các CKA và các cert còn lại trong Kubestronaut family nói chung.
- Học được nhiều, kiến thức hay bổ ích.
- Nhìn chung vẫn không khó vì ôn tủ được dạng đề.

## Nội Dung

**NOTE 1:** Đề thi thực luôn có cho sẵn link document reference chính xác với câu hỏi, nhưng vì mục đích học tập nói chung thì nên đọc lướt full doc để khi search sẽ flexible hơn :Đ

**NOTE 2**: Hơi lạ lúc thời điểm mình thi không ghi rõ whitelist trang [https://docs.docker.com/get-started/introduction/](https://docs.docker.com/get-started/introduction/), nhưng mà lúc làm thật thì có nhé

- Tham khảo official tại [Certified Kubernetes Security Specialist (CKS)](https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist/)
- Ngoài ra mình sẽ detail các câu hỏi, chuyên đề vào thời điểm mình thi năm 2026. Ôn hết và tự tin được là auto Win:
  - Biết sử dụng `trivy` để scan Docker image's security, generate SBOM, format output (thường là JSON)
  - Biết sử dụng `bom` để generate SBOM, format out (thường là json)
  - Biết sử dụng `kube-bench` để run CIS bench mark. Đọc output của command và fix lỗi security hoặc để verify lại sau khi fix.
  - Biết sử dụng `strace` để debug.
    - Thường đề sẽ cho use case 1 pod đang phá gì đó (đọc file nhạy cảm, connect to domain ngoài, ...). -> Tìm pod thủ phạm -> **Scale down Deployment**
    - Có 2 hướng:
      - Cách 1: Đi xuôi (Nếu có falco) -> Viết rule -> Trigger rule -> Lấy được **ContainerID** (hoặc có khi ra tên pod luôn) -> Tìm tên pod theo ContainerID bằng lệnh `docker`, `crictl` hoặc `podman`. Không cần dùng `strace`
      - Cách 2: Đi ngược, tìm mù quáng (thường scope giới hạn theo đề, namespace nào đó, một trong 3 pods, ...) -> Lấy đại 1 pod -> Tìm **ContainerID** theo tên pod bằng lệnh `docker`, `crictl` hoặc `podman` -> Inspect ContainerID -> Lấy được ProcessID -> Dùng lệnh `ps aux | grep` để xem ProcessID (nếu bước trước chỉ lấy được ProcessName) -> `strace -Cw` theo ProcessID -> Xem thử có syscall tương ứng không -> Tiếp tục vét cạn. Thường khó như này chỉ có trong Simulator, Don't worry!
  - Viết manifest Ingress có thêm TLS Certificate. Reference trong doc [http://kubernetes.io/](http://kubernetes.io/)
  - Network Policy Calico: Dễ , duplicate với CKA. Phải làm chủ viết rule theo bất kỳ yêu cầu nào.
  - Network Policy Cilium: Same với cái trên. 1 chuyên đề lớn cần luyện + Thêm 1 điểm là hơi khó với người mới, target là luôn phải tìm cách search hiệu quả khi vô thi. Làm quen với UI Doc của Cilium: [https://docs.cilium.io/en/latest/security/policy/index.html](https://docs.cilium.io/en/latest/security/policy/index.html)
  - Protect Metadata endpoint (trên AWS, GCP thường thấy vụ này): Cái này chỉ cần thành thạo viết Network Policy là được, ko cần quá chú ý. Giải thích: Thông thường các cloud sẽ có endpoint để đọc thông tin server (metadata) khá nhạy cảm, nên restrict pod traffic access tới endpoint này.
  - Xác minh sự toàn vẹn của tệp binary. Thường đề cho dùng `sha512sum`.
  - Thành thạo tạo clusterrole, role, binding các thể loại.
  - Cấu hình các flags của `kube-apiserver` sao cho secure hơn, ý này thật ra chỉ cần biết chạy CIS benchmark rồi fix. Không có gì đặc biệt
  - Cấu hình Docker engine sao cho secure hơn. Ghi nhớ trong đầu luôn đường dẫn `/etc/docker/daemon.json` để vào làm cho nhanh. Còn lại reference vào [https://docs.docker.com/get-started/introduction/](https://docs.docker.com/get-started/introduction/)
  - Biết cấu hình AppArmor, check xem modules các module nào đang được load trên kernel (của node đó), load modules vào kernel, sử dụng tên module trong pod template. Reference trong doc [http://kubernetes.io/](http://kubernetes.io/)
  - Biết cấu hình Seccomp. Đường dẫn mặc định Seccomp load ở đâu ? Cho sẵn file Seccomp -> Ném vào path mặc định. Load Seccomp profile trong pod template. Reference trong doc [http://kubernetes.io/](http://kubernetes.io/)
  - Pod Security Standard: Cho điểm, cấu hình nhanh vào labels của namespace rồi verify xem security policy đó áp dụng lên pods mới hay chưa. Reference trong doc [http://kubernetes.io/](http://kubernetes.io/)
  - Manage Kubernetes secrets: Cho điểm, CKA đã covers, map vào pod thành volumes, readonly, environment variables.
  - Tạo Runtimeclass: Cho điểm. Manifest có sẵn hết, các field không đổi gì nhiều. Reference trong doc [http://kubernetes.io/](http://kubernetes.io/)
  - Pod-to-Pod encryption (Cilium, Istio): Cho điểm, cấu hình cực dễ nhưng không check được. Cũng nên làm quen với doc[Cilium](https://docs.cilium.io/en/latest/security/policy/index.html) và [Istio](https://istio.io/latest/docs/)
  - Static analysis: Tự đánh giá 1 file Dockerfile hoặc Manifest (Pod, Statefulset, Deployment, ...) file nào insecure
    - Dockerfile:
      - Mấy line có copy secret ngoài vào 1 file `/tmp`, sau đó line tiếp theo có `rm` file /tmp đó. Bản chất Docker image layer vẫn lưu lại -> Insecure
      - Hard-coded secrets, token,... Quá rõ ràng
      - User ROOT -> Tùy để nói có bỏ qua hay không
    - Manifest:
      - Hard-coded secrets, token,... Quá rõ ràng
      - SecurityContexts: Các trường như `runAsUser: 0`, `privileged: true`, `allowPrivilegesEscalation: true` , ... -> Cứ thấy là cho cook, insecure.
  - Immutable pods: Cái khái niệm này hiêu rõ thì nên tìm hiểu. Trong scope CKS chỉ có 1 kiểu, `readOnlyRootFilesystem` phải là `true` -> `false` thì ko phải là immutable
  - Cấu hình Audit logs: Cho điểm, practice cũng tốn tí thời gian để nắm được flow hoàn chỉnh. Reference trong doc [Audit](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/)
  - Cấu hình Admission Hook: Cho điểm, cũng như trên, một chuyên đề nhỏ, 99% là ra `ImagePolicyWebhook` vì dễ test. Reference trong doc [ImagePolicyWebhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#imagepolicywebhook)
  - Cấu hình Falco Rule: Cho điểm, nhưng là chuyên đề lớn. Cần làm quen với doc Falco để thuần thục. Referent [Falco Rules](https://falco.org/docs/concepts/rules/).
  - Upgrade Kubernetes version cho master/worker nodes. CKA đã cover

**Đề thi: 16 Questions**

## Thi thử trên Simulator Exam

Nội dung trên cam đoan là 90% so với đề thi thật, nhưng 50% so với Simulator Exam. Độ biến động của Simulator Exam là cực kỳ khó chịu và kinh khủng, lúc mới làm Simulator Test A mình được có 50%, xong tâm lý quá dời lại thêm 1 tuần dự định thi

Sau 1 tuần mình tự tin hơn sau khi đọc hết đáp án của Simulator Test A và làm sang Test B được có 55%, :(((. Nhưng mà lúc này mình biết rõ là Simulator Test dùng để sát hạch tâm lý để người thi không chủ quan nên thôi cứ múc luôn.

Đề thi Simulator là đề thi phi lý nhất quả đất, ai mới lạ chưa biết câu hỏi vô làm là đảm bảo cóng tay cho dù bạn có thông minh cỡ nào cũng không thể hốt hết 100%. Chưa kể mỗi câu hỏi ở đây sẽ ít nhất x2 workload so với câu hỏi thực, chưa kể câu hỏi khó là search banh nóc nhà bà doc luôn. Ví dụ:

- Upgrade nodes trong Simulator: bắt làm 2 nodes, trong khi real luôn cho làm 1 node
- Cấu hình 1 cái chuyên đề gì đó to lớn, như Falco, Audit hay đặc biệt Network Policy: bắt cấu hình từ đầu tới cuối, Network Policy thì cho 3,4 rules cực dài. Đề real thì thường cấu hình Falco, Audit, Admission mount sẵn , kube-apiserver thì gắn sẵn flags rồi mình chỉ thay 1 vài field thôi. Network Policy thì cùng lắm 1,2 cái cơ bản.

# Real Exam

Lúc thi thật thì cũng không khác gì hồi thi CKA/CKAD, thủ tục vẫn như SHIT , nhưng thôi bỏ qua. Nhưng mà lúc làm thì dễ thở hơn 1000 lần với Simulator Exam, làm rất thoải mái và thời gian thì cũng dư dã, mình dùng bàn phím second hand để làm bài thi với tỳ lệ không ăn nút phím là 50% , mình gõ cực chậm mà vẫn qua:>>. Dư được tầm 7 phút.

Sau khi thi thì có một trouble 1 tí là thông thường khi thi xong chúng ta sẽ hay nhận được mail trông như này

<p><img src="assets/img/2025/vietnamese/cncf/cks/taking_exam.png" alt="Kubestronaut" /></p>

Tất cả 3 cert trước thi đều nhận mail sau khi thi xong. Nhưng mà lần này không có. Trường hợp này các bạn yên tâm là ngoài việc mình scale down pod trong môi trường exam, thì CNCF cũng tự scale down pod gửi mail cho mình. Tuy làm mình hết hồn và bồn chồn tới ngày hôm sau thì mọi thứ vẫn uy tín nhé. Đúng 24h sẽ có kết quả.

<p><img src="assets/img/2025/vietnamese/cncf/cks/exam_result.png" alt="Kubestronaut" /></p>

Nói chung đề thi dễ, không cần ôn quá nhiều cho kịch tính, mình ôn 3 tuần nhưng suggest 2 lần để thi cho hồi hộp. Đề thi hay + học được nhiều. Còn 1 cert nữa là thành phi hành gia.

Hơi tiếc là mấy cái admission liên quan tới OPA thực tế có nhu cầu dùng nhiều, tính thực tiễn cao mà Cert không includes vào, chắc nhiều quá rồi. OPA cũng là một chuyên đề lớn

**Kết quả**: `86%/67%`

---

**_Four are down, one more to go_**
