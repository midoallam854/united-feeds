import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineChevronRight, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';

const Contact = ({ language = 'en' }) => {
  const [activeSection, setActiveSection] = useState('contact'); // State to track active section
  const [expandedFAQ, setExpandedFAQ] = useState(null); // State to track which FAQ is expanded

  // Normalize the language prop to ensure it's either 'en' or 'ar'
  const normalizedLanguage = language === 'ar' ? 'ar' : 'en';

  const translations = {
    en: {
      home: 'Home',
      contactUs: 'Contact Us',
      askUs: 'Ask Us',
      faq: 'Frequently Asked Questions (FAQ)',
      usagePolicyLabel: 'Usage Policy', // Label for sidebar
      returnExchangePolicyLabel: 'Return & Exchange Policy', // Label for sidebar
      privacyPolicyLabel: 'Privacy Policy', // Label for sidebar
      telephone: 'Telephone Number',
      email: 'Email',
      name: 'Name',
      phoneNumber: 'Phone Number',
      city: 'City',
      subject: 'Subject',
      comment: 'Comment',
      submit: 'Submit',
      faqQuestions: [
        {
          question: 'What is the United Feeds Store?',
          answer:
            'It is an online store that offers products from the United Feeds Company, which are animal products imported from the best farms in the world, including various bulk grains such as barley, corn, soybean, and bran in all their forms.',
        },
        {
          question: 'What distinguishes United Store from its competitors?',
          answer:
            'It stands out by offering high-quality products at the best prices. Some of the key features of the store include: Meeting customer needs. Reducing cash transactions. Providing easy access to the customer database. Offering products imported from the best farms. and product information. Facilitating direct order tracking. Providing a cash-on-delivery service. Supporting all types of devices and multiple languages. Easy to use and navigate. Quick response and service.',
        },
        {
          question: 'How can I order from United Feeds Store?',
          answer:
            'You can order from United Feeds Store by visiting our website, selecting your desired products, and completing the checkout process. We also offer phone orders.',
        },
        {
          question: 'What is the order number?',
          answer:
            'The order number is the number that is automatically generated upon completing the order and is used to track the order\'s status with customer service representatives or in the order status section.',
        },
        {
          question: 'Where can I find the order number?',
          answer:
            'After completing the order process, you will be automatically redirected to a page that contains your order number. You can also find it by checking the email sent from the website, which includes the details of your order. Additionally, you can review the order number and its details from your account.',
        },
        {
          question: 'What payment methods are available?',
          answer:
            'After completing the order process, you will be automatically redirected to a page that contains your order number. You can also find it by checking the email sent from the website, which includes the details of your order. Additionally, you can review the order number and its details from your account.',
        },
        {
          question: 'How long does it take to process the order?',
          answer:
            'After completing the order process, you will be automatically redirected to a page that contains your order number. You can also find it by checking the email sent from the website, which includes the details of your order. Additionally, you can review the order number and its details from your account.',
        },
        {
          question: 'When are the products available?',
          answer:
            'There is no specific availability date for products. To track their availability, you can add the product to your favorites, and you will be notified as soon as the product becomes available, either through the website or the app.',
        },
        {
          question: 'I have an issue, can I contact you?',
          answer:
            'There is no specific availability date for products. To track their availability, you can add the product to your favorites, and you will be notified as soon as the product becomes available, either through the website or the app.',
        },
        {
          question: 'How can I track my order?',
          answer:
            'You can check the status of your order through our website or the app by logging into your account, going to \'My Orders,\' selecting the order, and tracking its status.',
        },
        {
          question: 'Can I cancel the order?',
          answer:
            '1. If the order has not been processed: - To cancel your order, please contact us at the unified number 920006839. - Our team may ask for the reason for cancellation so that we can serve you better in the future. 2. If the order has been processed: - Once the order is processed, we will not be able to cancel your order.',
        },
        {
          question: 'Can I edit/delete/add a product?',
          answer:
            '1. If the order has not been processed: - To cancel your order, please contact us at the unified number 920006839. - Our team may ask for the reason for cancellation so that we can serve you better in the future. 2. If the order has been processed: - Once the order is processed, we will not be able to cancel your order.',
        },
        {
          question: 'Can I edit my account information?',
          answer:
            'You can edit any of your account information (phone number, password, or email) through our website or app. Simply log in, go to \'My Account\' > \'Profile,\' click on the field you want to edit, enter the data, and then click \'Edit.\'',
        },
        {
          question: 'I forgot my password, how can I recover it?',
          answer:
            'If you forget your password, please go to the login page on the website or app, then click on \'Forgot Password\' and enter the recovery information or your mobile number.',
        },
        {
          question: 'What is Wallet Balance?',
          answer:
            'Wallet Balance is a specific amount of money that a customer can use entirely at any time during the purchasing process.',
        },
        {
          question: 'How can I use Wallet Balance?',
          answer:
            'Upon completing an order, the entire amount in the wallet is deducted immediately along with any remaining amount paid by the customer using one of the available payment methods.',
        },
        {
          question: 'If I delete my account, can I recover the balance?',
          answer:
            'You can recover the balance by contacting the customer service team via email or by calling the unified number: 920006839.',
        },
      ],
      usagePolicy: {
        title: 'Terms of Services',
        subtitle: 'Usage Policy',
        lastUpdated: 'Last Updated: April 10, 2025',
        intro:
          "This is the website of the United Feeds Company in the Kingdom of Saudi Arabia (referred to as 'the website' or 'the website'). It is available for the personal use of site visitors. Visitor access and use of this site are subject to these terms and conditions and the laws of the Kingdom of Saudi Arabia. The visitor's entry and use of this site constitute an unconditional agreement to the terms and conditions of use, whether registered or not. This agreement takes effect from the first use of this site - This website provides information, data, and services related to the business of the United Feeds Company (referred to as United Feeds Company). By using this website, you acknowledge and agree to refrain from the following:",
        rules: [
          'Providing or uploading files that contain software, materials, data, or other information that you do not own or have a license for.',
          'Using this site in any way to send any commercial or unwanted email or any form of abuse.',
          'Providing or uploading files on this site that contain viruses or corrupted data.',
          'Publishing, advertising, distributing, or disseminating materials or information that defame, violate regulations, contain obscene or indecent content, or are in violation of public morality, or any illegal materials or information through the site.',
          'Engaging through this site in unlawful or irregular activities within the Kingdom of Saudi Arabia.',
          'Advertising on this site any product or service that puts us in violation of any applicable law or regulation in any field.',
          'Using any means, software, or actions to obstruct or attempt to obstruct the proper operation of the site.',
          'Taking any action that unreasonably or inappropriately imposes an undue or excessive burden on the site’s infrastructure.',
        ],
        electronicLinks:
          'The United Feeds Company’s website may contain electronic links to other websites or portals that may use methods to protect information and privacy different from ours. We are not responsible for the content, methods, and privacy of these other websites, and we recommend referring to their privacy notices.',
        propertyRights:
          "This website is owned by the United Feeds Company. All website content, including software and information, is fully protected in accordance with Saudi copyright, trademark, and various property rights laws. Furthermore, all intellectual property rights for the website's content belong to the United Feeds Company. Except as otherwise indicated, you may not sell, license, rent, modify, copy, reproduce, reprint, download, advertise, transmit, distribute, publicly display, edit, or create derivative works from any materials or content from this website for public or commercial purposes without prior written consent from the website's management. Any modification of the website's content is strictly prohibited. In addition, the graphics and images on this website are protected by copyright, and may not be copied or used in any way without prior written consent from the website's management.",
        disclaimerPolicy:
          "This website is a private website managed by the United Feeds Company. Its content is published in collaboration with other government entities. The United Feeds Company does not guarantee the full accuracy and correctness of the website's content, as some information may change. Therefore, the company assumes no responsibility or consequences resulting from the use of the information provided on the website, including: Accuracy and correctness of information, Effectiveness in preventing breaches, Relevance of the website content, Continuity or validity, Absence of viruses or harmful elements on the website or server. The company is not legally responsible for any loss or damage of any kind (direct or indirect) resulting from the use of this website. The servers operating the site automatically collect visitors' IP addresses when they visit one of the organization's websites. The IP address is used to help diagnose server problems and to perform statistics on its usage. The site uses cookies, and these files help users navigate the site easily. If desired, these files can be used to remember passwords and facilitate and speed up the login process to some sites. These files are stored on the computer's hard drive.",
        limitationOfLiability:
          'The electronic services and data provided by the website of the United Company for Feeds and obtaining any information about various government entities are only provided to facilitate manual procedures. By this, the user acknowledges full awareness that Internet communications may be subject to interception or interception by others, and that the website does not replace the information available through official authorities, and that requests and administrative procedures can be taken directly with the relevant authorities.',
        virusProtection:
          'The company makes every effort to examine and test the contents of this website at all stages of its preparation, and visitors are always advised to run an up-to-date antivirus program on all materials downloaded from the Internet. The company is not responsible for any loss, interruption, data damage to the user, their personal computer, or any damage that may occur when connecting to this website or using any material contained therein.',
        waiverOfClaims:
          "In its entirety, the website of the United Feeds Company, including all its information, services, materials, and functions, or that which can be accessed through the website, is provided for your personal use as is, without any acknowledgments, promises, or warranties of any kind. The website's administration cannot guarantee or be held responsible for any interruptions, errors, or violations that may arise from using this website, its content, or any associated site, whether with or without the knowledge of the website's administration. Any communications or information sent by the user through this website shall not grant them ownership or the right to guarantee its confidentiality. Additionally, any interactive use contained within this website does not imply or intend to guarantee any rights, licenses, or privileges of any kind to the user.",
        compensation:
          'By this, the user acknowledges not to take any action against the United Feeds Company or any of its management, and to indemnify and secure them from liability, as well as any parties or employees responsible for the management, maintenance, update, or provision of the website, from any and all obligations and responsibilities that may arise in connection with any claim arising from any violation on their part of the terms and conditions of use, or any of the prevailing laws, whether in the Kingdom of Saudi Arabia or the place where they reside.',
        terminationOfAccess:
          'The United Feeds Company may, at its absolute discretion, terminate, restrict, or suspend your right to access and use the website without notice and for any reason, including a violation of the terms and conditions of use or any other behavior we may consider, at our discretion, to be unlawful or harmful to others. In the event of termination, you will not be permitted to access this website.',
        judicialReference:
          'By this, the user exclusively agrees to submit to the judicial authorities in the Kingdom of Saudi Arabia regarding all claims and disputes arising from your use of this website.',
      },
      returnExchangePolicy: {
        title: 'Return & Exchange Policy',
        subtitle: 'Return & Exchange Policy',
        lastUpdated: 'Last Updated: April 10, 2025',
        returnPolicy:
          'Products can be returned in the following cases: If the product does not match the description agreed upon in the invoice, in this case, the return request can be completed under the following conditions: - The product must be in its original condition and accompanied by the invoice. - All products can be returned within a period not exceeding 3 days from the date of receiving the order, in order to maintain the product’s quality and preservation. If the product is damaged from the same date of receiving the order, and the quality team has confirmed this damage, the product will be replaced for the customer.',
      },
      privacyPolicy: {
        title: 'Privacy Policy',
        subtitle: 'Privacy Policy',
        lastUpdated: 'Last Updated: April 10, 2025',
        intro:
          'We appreciate your concerns and interests regarding the privacy of your data on the Internet. This policy has been prepared to help you understand the nature of the data we collect from you when you visit our website or use our internet application and how we handle this personal data.',
        browsing:
          'We have not designed this website or application to collect your personal data from your computer while browsing this website or application. Only data provided by you with your knowledge and free will shall be used.',
        ipAddress:
          'At any time you visit any website, including this website or application, the host server will record your Internet Protocol (IP) address, date and time of your visit, and the type of web browser you are using, along with the URL address of any website that referred you to this website.',
        onlineSurveys:
          'The online surveys we conduct directly on the web enable us to collect specific data regarding your opinions and feelings about our website or application. Your responses are of utmost importance and highly appreciated as they allow us to improve the website and the application. You have complete freedom and choice in providing data related to your name and other information.',
        linksToOtherSites:
          'Our website may include links to other websites or advertisements from other websites, such as Google AdSense. We are not responsible for data collection methods by those websites. You can review the privacy policies and content of those websites accessed through any link within this website.',
        informationDisclosure:
          'We will always maintain the privacy and confidentiality of all personal data we obtain. This information will not be disclosed unless required by any law or when we believe in good faith that such action is necessary or desirable to comply with the law or defend or protect the rights of the property of this website or the parties benefiting from it.',
        dataForTransactions:
          'When we need any data that is specific to you, we will ask you to provide it of your own free will. This information will help us to contact you and execute your requests wherever possible. Your provided data will never be sold to any third party for marketing purposes without your prior and written consent, unless it is included in aggregated data used for statistical and research purposes without any information that can identify you.',
        whenContactingUs:
          'All data provided by you will be treated as confidential. The forms presented directly on the web require providing data that will help us improve our website. The data you provide will be used to respond to all your inquiries, feedback, or requests by this website or any of its affiliated sites.',
        disclosureToThirdParties:
          'We will not sell, trade, rent, or disclose any information for the benefit of any third party outside of this website, application, or its affiliated sites. Information will only be disclosed in the event of an order from any judicial or regulatory authority.',
        amendments:
          'We reserve the right to amend the terms and conditions of the Privacy and Data Confidentiality Policy if necessary and when it is appropriate. Amendments will be implemented here, and you will be continuously notified of the data we obtain, how we will use it, and the parties to whom we will provide this data.',
        contactingUs:
          "You can contact us when needed by clicking on the 'Contact Us' link available on our website or application, or by contacting us at the toll-free number 920006839.",
        conclusion:
          'Your concerns and interests regarding data confidentiality and privacy are of the utmost importance to us. We hope to achieve this through this policy.',
      },
    },
    ar: {
      home: 'الرئيسية',
      contactUs: 'اتصل بنا',
      askUs: 'اسألنا',
      faq: 'الأسئلة الشائعة (FAQ)',
      usagePolicyLabel: 'سياسة الاستخدام', // Label for sidebar
      returnExchangePolicyLabel: 'سياسة الإرجاع والاستبدال', // Label for sidebar
      privacyPolicyLabel: 'سياسة الخصوصية', // Label for sidebar
      telephone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      name: 'الاسم',
      phoneNumber: 'رقم الهاتف',
      city: 'المدينة',
      subject: 'الموضوع',
      comment: 'التعليق',
      submit: 'إرسال',
      faqQuestions: [
        {
          question: 'ما هو متجر United Feeds؟',
          answer:
'هو متجر إلكتروني يوفر منتجات الشركة المتحدة للأعلاف وهي منتجات حيوانية مستوردة من أفضل المزارع العالمية، تتضمن العديد من الحبوب السائبة منها الشعير والذرة والصويا والنخالة بأنواعهم'
        },
        {
          question: 'ما الذي يميز متجر United عن منافسيه؟',
          answer:
'يتميز بتقديم منتجات عالية الجودة وبأفضل الأسعار. ومن أهم مميزات المتجر: يلبي احتياجات العملاء يقلل تداول الأوراق النقدية يسهل الوصول لقاعدة بيانات العملاء يوفر منتجات مستوردة من أفضل المزارع يوضح الأسعار ومعلومات المنتجات يسهل التتبع المباشر لحالة الطلب يوفر خدمة الدفع عند الاستلام يدعم جميع أنواع الأجهزة وبلغات متعددة سهل الاستخدام والتنقل استجابة وخدمة سريعة'
        },
        {
          question: 'كيف يمكنني الطلب من متجر United Feeds؟',
          answer:
            'يمكنك الطلب من متجر United Feeds من خلال زيارة موقعنا الإلكتروني، واختيار المنتجات المطلوبة، وإتمام عملية الدفع. كما نقدم الطلب عبر الهاتف.',
        },
        {
          question: 'ما هو رقم الطلب؟',
          answer:
'رقم الطلب هو الرقم الذي يتم إرساله تلقائياً فور إتمام الطلب ويستخدم لمتابعة حالة الطلب مع ممثلي خدمة العملاء أو في خانة حالة الطلب.'
        },
        {
          question: 'أين يمكنني العثور على رقم الطلب؟',
          answer:
'بعد إتمامك لعملية الطلب سيتم تحويلك تلقائياً إلى صفحة تحتوي على رقم طلبك. كذلك يمكنك معرفته من خلال الاطلاع على البريد الإلكتروني المرسل من الموقع والذي يتضمن تفاصيل طلبك، بالإضافة إلى أنه يمكنك استعراض رقم الطلب وتفاصيله من حسابك.'
        },
        {
          question: 'ما هي طرق الدفع المتاحة؟',
          answer:
'خدمة الدفع عند الاستلام: متوفرة لعملاءنا في جميع فروعنا في المملكة. بالإضافة إلى خدمة الدفع عن طريق سداد. وقريبًا ستتوفر خدمة الدفع عن طريق بطاقات مدى، فيزا، ماستر كارد، أبل باي، تمارا.'
        },
        {
          question: 'كم من الوقت يستغرق معالجة الطلب؟',
          answer:
'تستغرق مدة تعبئة الطلبات 30 دقيقة لجميع فروعنا في المملكة العربية السعودية. متى تتوفر المنتجات؟'
        },
        {
          question: 'متى تكون المنتجات متاحة؟',
          answer:
'لا يوجد موعد محدد لتوفر المنتجات، لمتابعة توفرها بإمكانك إضافة المنتج للمفضلة وسوف يتم تنبيهك فور توفر المنتج سواء عن طريق الموقع أو التطبيق.'
        },
        {
          question: 'لدي مشكلة، هل يمكنني التواصل معكم؟',
          answer:
'نعم، وبكل سرور! يمكنك التواصل معنا عبر خدمة العملاء في الموقع الإلكتروني أو بمراسلتنا على البريد الإلكتروني info@ufc.com.sa أو على الرقم الموحد 920006839'
        },
        {
          question: 'كيف يمكنني تتبع طلبي؟',
          answer:
'يمكنك معرفة حالة طلبك عن طريق موقعنا أو التطبيق، الدخول إلى حسابي > طلباتي > الطلب > تتبع حالة الطلب'
        },
        {
          question: 'هل يمكنني إلغاء الطلب؟',
          answer:
'- إذا لم يتم تعبئة الطلب: - لإلغاء طلبك يرجى الاتصال بنا على الرقم الموحد 920006839. - قد يطلب منك فريقنا معرفة سبب الإلغاء حتى نتمكن من خدمتك بشكل أفضل في المستقبل. 2- إذا تم تعبئة الطلب: - بمجرد تعبئة الطلب، لن نتمكن من إلغاء طلبك.'
        },
        {
          question: 'هل يمكنني تعديل/حذف/إضافة منتج؟',
          answer:
'نعم بإمكانك تعديل، حذف أو إضافة منتج مالم يتم تعبئة الطلب. وذلك بالتواصل مع فريق خدمة العملاء خلال أوقات العمل الرسمية على الرقم الموحد: 920006839'
        },
        {
          question: 'هل يمكنني تعديل معلومات حسابي؟',
          answer:
'يمكنك تعديل أي من بيانات الحساب (رقم الجوال، كلمة المرور أو الإيميل) عن طريق موقعنا أو خلال الدخول على صفحة حسابي الملف الشخصي ثم الضغط على الحقل المرغوب تعديله وإدخال البيانات ثم الضغط على تعديل.'
        },
        {
          question: 'نسيت كلمة المرور، كيف يمكنني استعادتها؟',
          answer:
'عند نسيان كلمة المرور الرجاء الدخول على صفحة تسجيل الدخول من الموقع أو التطبيق ثم الضغط على \' نسيت كلمة المرور\' وإدخال بيانات الاستعادة أو رقم الجوال.'
        },
        {
          question: 'ما هو رصيد المحفظة؟',
          answer:
'هو مبلغ خاص بالعميل يمكنه الاستفادة منه كاملا في أي وقت في عمليات الشرء.'
        },
        {
          question: 'كيف يمكنني استخدام رصيد المحفظة؟',
          answer:
'عند إتمام الطلب من قبل العميل يتم خصم كامل المبلغ الموجود في المحفظة فوراً مع أي طلب ومن ثم يتم دفع المبلغ المتبقي من قِبل العميل بأحد طرق الدفع المتاحة.'
        },
        {
          question: 'إذا قمت بحذف حسابي، هل يمكنني استعادة الرصيد؟',
          answer:
'يمكنك استرجاع الرصيد عن طريق التواصل مع فريق خدمة العملاء من خلال الإيميل أو الاتصال على الرقم الموحد: 920006839.'
        },
      ],
      usagePolicy: {
        title: 'شروط الخدمة',
        subtitle: 'سياسة الاستخدام',
        lastUpdated: 'آخر تحديث: 10 أبريل 2025',
        intro:
          "هذا هو الموقع الإلكتروني لشركة United Feeds في المملكة العربية السعودية (يُشار إليه بـ 'الموقع' أو 'الموقع الإلكتروني'). وهو متاح للاستخدام الشخصي لزوار الموقع. يخضع وصول الزوار واستخدامهم لهذا الموقع لهذه الشروط والأحكام وقوانين المملكة العربية السعودية. يشكل دخول الزائر واستخدامه لهذا الموقع موافقة غير مشروطة على شروط وأحكام الاستخدام، سواء كان مسجلاً أم لا. يسري هذا الاتفاق من الاستخدام الأول لهذا الموقع - يوفر هذا الموقع الإلكتروني معلومات وبيانات وخدمات تتعلق بأعمال شركة United Feeds (يُشار إليها باسم شركة United Feeds). باستخدام هذا الموقع، فإنك تقر وتوافق على الامتناع عن ما يلي:",
        rules: [
          'توفير أو رفع ملفات تحتوي على برامج أو مواد أو بيانات أو معلومات أخرى لا تملكها أو ليس لديك ترخيص لها.',
          'استخدام هذا الموقع بأي طريقة لإرسال أي بريد إلكتروني تجاري أو غير مرغوب فيه أو أي شكل من أشكال الإساءة.',
          'توفير أو رفع ملفات على هذا الموقع تحتوي على فيروسات أو بيانات تالفة.',
          'نشر أو الإعلان أو التوزيع أو نشر مواد أو معلومات تشوه السمعة، أو تنتهك اللوائح، أو تحتوي على محتوى فاحش أو غير لائق، أو تنتهك الأخلاق العامة، أو أي مواد أو معلومات غير قانونية من خلال الموقع.',
          'الانخراط من خلال هذا الموقع في أنشطة غير قانونية أو غير نظامية داخل المملكة العربية السعودية.',
          'الإعلان على هذا الموقع عن أي منتج أو خدمة تجعلنا في انتهاك لأي قانون أو لائحة سارية في أي مجال.',
          'استخدام أي وسيلة أو برنامج أو إجراءات لعرقلة أو محاولة عرقلة التشغيل السليم للموقع.',
          'اتخاذ أي إجراء يفرض عبئًا غير معقول أو غير مناسب على بنية الموقع التحتية.',
        ],
        electronicLinks:
          'قد يحتوي موقع شركة United Feeds على روابط إلكترونية لمواقع أو بوابات أخرى قد تستخدم طرقًا لحماية المعلومات والخصوصية تختلف عن طرقنا. نحن لسنا مسؤولين عن المحتوى أو الطرق أو الخصوصية لهذه المواقع الأخرى، ونوصي بالرجوع إلى إشعارات الخصوصية الخاصة بها.',
        propertyRights:
          'هذا الموقع مملوك لشركة United Feeds. جميع محتويات الموقع، بما في ذلك البرامج والمعلومات، محمية بالكامل وفقًا لقوانين حقوق الطبع والنشر والعلامات التجارية وحقوق الملكية المتنوعة في المملكة العربية السعودية. علاوة على ذلك، جميع حقوق الملكية الفكرية لمحتوى الموقع تعود لشركة United Feeds. ما لم يُذكر خلاف ذلك، لا يجوز لك بيع أو ترخيص أو تأجير أو تعديل أو نسخ أو إعادة إنتاج أو إعادة طباعة أو تنزيل أو الإعلان أو النقل أو التوزيع أو العرض العام أو التعديل أو إنشاء أعمال مشتقة من أي مواد أو محتوى من هذا الموقع لأغراض عامة أو تجارية دون موافقة كتابية مسبقة من إدارة الموقع. أي تعديل لمحتوى الموقع ممنوع منعًا باتًا. بالإضافة إلى ذلك، الصور والرسومات على هذا الموقع محمية بحقوق الطبع والنشر، ولا يجوز نسخها أو استخدامها بأي شكل دون موافقة كتابية مسبقة من إدارة الموقع.',
        disclaimerPolicy:
          'هذا الموقع هو موقع خاص تُديره شركة United Feeds. يتم نشر محتواه بالتعاون مع جهات حكومية أخرى. لا تضمن شركة United Feeds الدقة والصحة الكاملة لمحتوى الموقع، حيث قد تتغير بعض المعلومات. لذلك، لا تتحمل الشركة أي مسؤولية أو عواقب ناتجة عن استخدام المعلومات المقدمة على الموقع، بما في ذلك: دقة وصحة المعلومات، الفعالية في منع الانتهاكات، صلة محتوى الموقع، الاستمرارية أو الصلاحية، خلو الموقع أو الخادم من الفيروسات أو العناصر الضارة. الشركة غير مسؤولة قانونيًا عن أي خسارة أو ضرر من أي نوع (مباشر أو غير مباشر) ناتج عن استخدام هذا الموقع. تجمع الخوادم التي تشغل الموقع عناوين IP الخاصة بالزوار تلقائيًا عند زيارتهم لأحد مواقع المنظمة. يُستخدم عنوان IP للمساعدة في تشخيص مشاكل الخادم ولإجراء إحصاءات حول استخدامه. يستخدم الموقع ملفات تعريف الارتباط (cookies)، وتساعد هذه الملفات المستخدمين على التنقل في الموقع بسهولة. إذا رغبت، يمكن استخدام هذه الملفات لتذكر كلمات المرور وتسهيل وتسريع عملية تسجيل الدخول إلى بعض المواقع. تُخزن هذه الملفات على القرص الصلب للكمبيوتر.',
        limitationOfLiability:
          'الخدمات الإلكترونية والبيانات التي يوفرها موقع شركة United Feeds والحصول على أي معلومات حول جهات حكومية مختلفة تُقدم فقط لتسهيل الإجراءات اليدوية. بموجب هذا، يقر المستخدم بمعرفة كاملة بأن الاتصالات عبر الإنترنت قد تكون عرضة للاختراق أو التدخل من قبل الآخرين، وأن الموقع لا يحل محل المعلومات المتاحة من خلال الجهات الرسمية، وأن الطلبات والإجراءات الإدارية يمكن اتخاذها مباشرة مع الجهات المختصة.',
        virusProtection:
          'تبذل الشركة كل جهد لفحص واختبار محتويات هذا الموقع في جميع مراحل إعداده، ويُنصح الزوار دائمًا بتشغيل برنامج مكافحة فيروسات محدث على جميع المواد التي يتم تنزيلها من الإنترنت. الشركة غير مسؤولة عن أي خسارة أو انقطاع أو تلف بيانات للمستخدم أو جهاز الكمبيوتر الشخصي الخاص به أو أي ضرر قد يحدث عند الاتصال بهذا الموقع أو استخدام أي مادة واردة فيه.',
        waiverOfClaims:
          'بكامله، يُقدم موقع شركة United Feeds، بما في ذلك جميع معلوماته وخدماته ومواده ووظائفه، أو ما يمكن الوصول إليه من خلال الموقع، لاستخدامك الشخصي كما هو، دون أي تأكيدات أو وعود أو ضمانات من أي نوع. لا يمكن لإدارة الموقع ضمان أو تحمل المسؤولية عن أي انقطاعات أو أخطاء أو انتهاكات قد تنشأ من استخدام هذا الموقع أو محتواه أو أي موقع مرتبط، سواء بمعرفة إدارة الموقع أو بدونها. أي اتصالات أو معلومات يرسلها المستخدم من خلال هذا الموقع لن تمنحه ملكية أو الحق في ضمان سريتها. بالإضافة إلى ذلك، أي استخدام تفاعلي وارد في هذا الموقع لا يعني أو يهدف إلى ضمان أي حقوق أو تراخيص أو امتيازات من أي نوع للمستخدم.',
        compensation:
          'بموجب هذا، يقر المستخدم بعدم اتخاذ أي إجراء ضد شركة United Feeds أو أي من إدارتها، وتعويضهم وحمايتهم من المسؤولية، وكذلك أي أطراف أو موظفين مسؤولين عن إدارة أو صيانة أو تحديث أو توفير الموقع، من جميع الالتزامات والمسؤوليات التي قد تنشأ فيما يتعلق بأي مطالبة تنشأ عن أي انتهاك من جانبهم لشروط وأحكام الاستخدام، أو أي من القوانين السائدة، سواء في المملكة العربية السعودية أو المكان الذي يقيمون فيه.',
        terminationOfAccess:
          'يجوز لشركة United Feeds، وفقًا لتقديرها المطلق، إنهاء أو تقييد أو تعليق حقك في الوصول واستخدام الموقع دون إشعار ولأي سبب، بما في ذلك انتهاك شروط وأحكام الاستخدام أو أي سلوك قد نعتبره، وفقًا لتقديرنا، غير قانوني أو ضار بالآخرين. في حالة الإنهاء، لن يُسمح لك بالوصول إلى هذا الموقع.',
        judicialReference:
          'بموجب هذا، يوافق المستخدم حصريًا على الخضوع للسلطات القضائية في المملكة العربية السعودية فيما يتعلق بجميع المطالبات والنزاعات الناشئة عن استخدامك لهذا الموقع.',
      },
      returnExchangePolicy: {
        title: 'سياسة الإرجاع والاستبدال',
        subtitle: 'سياسة الإرجاع والاستبدال',
        lastUpdated: 'آخر تحديث: 10 أبريل 2025',
        returnPolicy:
          'يمكن إرجاع المنتجات في الحالات التالية: إذا لم يتطابق المنتج مع الوصف المتفق عليه في الفاتورة، في هذه الحالة يمكن إتمام طلب الإرجاع وفقًا للشروط التالية: - يجب أن يكون المنتج في حالته الأصلية ومرفقًا مع الفاتورة. - يمكن إرجاع جميع المنتجات خلال فترة لا تتجاوز 3 أيام من تاريخ استلام الطلب، وذلك للحفاظ على جودة المنتج وحفظه. إذا كان المنتج تالفًا من تاريخ استلام الطلب، وأكد فريق الجودة هذا التلف، سيتم استبدال المنتج للعميل.',
      },
      privacyPolicy: {
        title: 'سياسة الخصوصية',
        subtitle: 'سياسة الخصوصية',
        lastUpdated: 'آخر تحديث: 10 أبريل 2025',
        intro:
          'نقدر مخاوفك واهتماماتك بشأن خصوصية بياناتك على الإنترنت. تم إعداد هذه السياسة لمساعدتك على فهم طبيعة البيانات التي نجمعها منك عند زيارة موقعنا الإلكتروني أو استخدام تطبيقنا على الإنترنت وكيف نتعامل مع هذه البيانات الشخصية.',
        browsing:
          'لم نصمم هذا الموقع أو التطبيق لجمع بياناتك الشخصية من جهاز الكمبيوتر الخاص بك أثناء تصفح هذا الموقع أو التطبيق. سيتم استخدام البيانات التي تقدمها بنفسك بمعرفتك وإرادتك الحرة فقط.',
        ipAddress:
          'في أي وقت تزور فيه أي موقع إلكتروني، بما في ذلك هذا الموقع أو التطبيق، سيسجل الخادم المضيف عنوان بروتوكول الإنترنت (IP) الخاص بك، وتاريخ ووقت زيارتك، ونوع متصفح الويب الذي تستخدمه، إلى جانب عنوان URL لأي موقع ويب أحالك إلى هذا الموقع.',
        onlineSurveys:
          'الاستطلاعات عبر الإنترنت التي نجريها مباشرة على الويب تمكننا من جمع بيانات محددة تتعلق بآرائك ومشاعرك حول موقعنا الإلكتروني أو تطبيقنا. ردودك ذات أهمية قصوى ونقدرها بشدة لأنها تتيح لنا تحسين الموقع والتطبيق. لديك الحرية الكاملة والخيار في تقديم البيانات المتعلقة باسمك ومعلومات أخرى.',
        linksToOtherSites:
          'قد يتضمن موقعنا الإلكتروني روابطًا لمواقع إلكترونية أخرى أو إعلانات من مواقع أخرى، مثل Google AdSense. نحن لسنا مسؤولين عن طرق جمع البيانات من قبل تلك المواقع. يمكنك مراجعة سياسات الخصوصية ومحتوى تلك المواقع التي يتم الوصول إليها من خلال أي رابط ضمن هذا الموقع.',
        informationDisclosure:
          'سنحافظ دائمًا على خصوصية وسرية جميع البيانات الشخصية التي نحصل عليها. لن يتم الكشف عن هذه المعلومات إلا إذا كان ذلك مطلوبًا بموجب أي قانون أو عندما نعتقد بحسن نية أن مثل هذا الإجراء ضروري أو مرغوب فيه للامتثال للقانون أو للدفاع عن أو حماية حقوق الملكية لهذا الموقع أو الأطراف المستفيدة منه.',
        dataForTransactions:
          'عندما نحتاج إلى أي بيانات خاصة بك، سنطلب منك تقديمها بمحض إرادتك. ستساعدنا هذه المعلومات في التواصل معك وتنفيذ طلباتك حيثما أمكن ذلك. لن يتم بيع البيانات التي تقدمها لأي طرف ثالث لأغراض التسويق دون موافقتك المسبقة والمكتوبة، إلا إذا كانت مشمولة في بيانات مجمعة تُستخدم لأغراض إحصائية وبحثية دون أي معلومات يمكن أن تحدد هويتك.',
        whenContactingUs:
          'جميع البيانات التي تقدمها ستُعامل على أنها سرية. تتطلب النماذج المقدمة مباشرة على الويب تقديم بيانات ستساعدنا في تحسين موقعنا الإلكتروني. سيتم استخدام البيانات التي تقدمها للرد على جميع استفساراتك أو تعليقاتك أو طلباتك من قبل هذا الموقع أو أي من المواقع التابعة له.',
        disclosureToThirdParties:
          'لن نبيع أو نتاجر أو نؤجر أو نكشف عن أي معلومات لصالح أي طرف ثالث خارج هذا الموقع أو التطبيق أو المواقع التابعة له. سيتم الكشف عن المعلومات فقط في حالة وجود أمر من أي سلطة قضائية أو تنظيمية.',
        amendments:
          'نحتفظ بالحق في تعديل شروط وأحكام سياسة الخصوصية وسرية البيانات إذا لزم الأمر وعندما يكون ذلك مناسبًا. سيتم تنفيذ التعديلات هنا، وسيتم إعلامك باستمرار بالبيانات التي نحصل عليها، وكيف سنستخدمها، والأطراف التي سنقدم لها هذه البيانات.',
        contactingUs:
          'يمكنك التواصل معنا عند الحاجة بالنقر على رابط "اتصل بنا" المتاح على موقعنا الإلكتروني أو تطبيقنا، أو بالتواصل معنا على الرقم المجاني 920006839.',
        conclusion:
          'مخاوفك واهتماماتك بشأن سرية البيانات والخصوصية هي من أهم أولوياتنا. نأمل أن نحقق ذلك من خلال هذه السياسة.',
      },
    },
  };

  // Debug: Log the language and translations to ensure they're correct
  console.log('Language:', normalizedLanguage);
  console.log('Translations:', translations[normalizedLanguage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log('Form submitted');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setExpandedFAQ(null); // Reset expanded FAQ when switching sections
  };

  const handleFAQClick = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index); // Toggle the expanded FAQ
  };

  // Fallback in case translations are not available
  if (!translations[normalizedLanguage]) {
    return <div className="text-red-600 text-center p-6">Error: Language not supported. Please use 'en' or 'ar'.</div>;
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${normalizedLanguage === 'ar' ? 'rtl' : 'ltr'} bg-gray-50 min-h-screen`}>
      {/* Breadcrumb */}
      <nav className="text-sm font-medium text-gray-500 mb-6">
        <Link to="/" className="text-gray-600 hover:text-[#78B833] transition-colors">
          {translations[normalizedLanguage].home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{translations[normalizedLanguage].contactUs}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#78B833] mb-6 border-b border-gray-200 pb-3">
            {translations[normalizedLanguage].askUs}
          </h2>
          <ul className="space-y-4">
            <li
              className={`flex items-center justify-between cursor-pointer p-3 rounded-md transition-colors ${
                activeSection === 'contact'
                  ? 'bg-[#78B833] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#78B833]'
              }`}
              onClick={() => handleSectionChange('contact')}
            >
              <span className="font-medium">{translations[normalizedLanguage].contactUs}</span>
              <HiOutlineChevronRight className="w-5 h-5" />
            </li>
            <li
              className={`flex items-center justify-between cursor-pointer p-3 rounded-md transition-colors ${
                activeSection === 'faq'
                  ? 'bg-[#78B833] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#78B833]'
              }`}
              onClick={() => handleSectionChange('faq')}
            >
              <span className="font-medium">{translations[normalizedLanguage].faq}</span>
              <HiOutlineChevronRight className="w-5 h-5" />
            </li>
            <li
              className={`flex items-center justify-between cursor-pointer p-3 rounded-md transition-colors ${
                activeSection === 'usage'
                  ? 'bg-[#78B833] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#78B833]'
              }`}
              onClick={() => handleSectionChange('usage')}
            >
              <span className="font-medium">{translations[normalizedLanguage].usagePolicyLabel}</span>
              <HiOutlineChevronRight className="w-5 h-5" />
            </li>
            <li
              className={`flex items-center justify-between cursor-pointer p-3 rounded-md transition-colors ${
                activeSection === 'return'
                  ? 'bg-[#78B833] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#78B833]'
              }`}
              onClick={() => handleSectionChange('return')}
            >
              <span className="font-medium">{translations[normalizedLanguage].returnExchangePolicyLabel}</span>
              <HiOutlineChevronRight className="w-5 h-5" />
            </li>
            <li
              className={`flex items-center justify-between cursor-pointer p-3 rounded-md transition-colors ${
                activeSection === 'privacy'
                  ? 'bg-[#78B833] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#78B833]'
              }`}
              onClick={() => handleSectionChange('privacy')}
            >
              <span className="font-medium">{translations[normalizedLanguage].privacyPolicyLabel}</span>
              <HiOutlineChevronRight className="w-5 h-5" />
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4 flex flex-col lg:flex-row gap-8">
          {/* Contact Information (Only visible when Contact Us is active) */}
          {activeSection === 'contact' && (
            <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                {translations[normalizedLanguage].contactUs}
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <HiOutlinePhone className="w-6 h-6 text-[#78B833] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">{translations[normalizedLanguage].telephone}</p>
                    <p className="text-lg font-semibold text-gray-800">+920 006 839</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineMail className="w-6 h-6 text-[#78B833] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">{translations[normalizedLanguage].email}</p>
                    <p className="text-lg font-semibold text-gray-800">info@ufc.com.sa</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Section: Contact Form, FAQ, Usage Policy, Return Policy, or Privacy Policy */}
          {activeSection === 'contact' ? (
            <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder={translations[normalizedLanguage].name}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all text-gray-700 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={translations[normalizedLanguage].email}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all text-gray-700 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <span className="px-3 py-3 text-gray-600 bg-gray-50 border-r border-gray-200">+966</span>
                    <input
                      type="tel"
                      placeholder={translations[normalizedLanguage].phoneNumber}
                      className="w-full p-3 border-none focus:outline-none focus:ring-2 focus:ring-[#78B833] rounded-r-lg text-gray-700 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={translations[normalizedLanguage].city}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={translations[normalizedLanguage].subject}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all text-gray-700 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder={translations[normalizedLanguage].comment}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all text-gray-700 placeholder-gray-400"
                    rows="5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#78B833] text-white py-3 px-8 rounded-lg hover:bg-[#6aa02b] transition-colors font-semibold shadow-md"
                >
                  {translations[normalizedLanguage].submit}
                </button>
              </form>
            </div>
          ) : activeSection === 'faq' ? (
            <div className="lg:w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                {translations[normalizedLanguage].faq}
              </h2>
              <ul className="space-y-4">
                {translations[normalizedLanguage].faqQuestions.map((faq, index) => (
                  <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div
                      className="flex items-center justify-between cursor-pointer text-gray-800 hover:text-[#78B833] transition-colors"
                      onClick={() => handleFAQClick(index)}
                    >
                      <span className="font-semibold text-lg">{faq.question}</span>
                      <HiOutlineChevronRight
                        className={`w-5 h-5 transform transition-transform text-[#78B833] ${
                          expandedFAQ === index ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    {expandedFAQ === index && (
                      <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : activeSection === 'usage' ? (
            <div className="lg:w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{translations[normalizedLanguage].usagePolicy.title}</h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">{translations[normalizedLanguage].usagePolicy.subtitle}</h3>
              <p className="text-sm text-gray-500 mb-6">{translations[normalizedLanguage].usagePolicy.lastUpdated}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.intro}</p>
              <ul className="list-disc pl-6 space-y-3 mb-6">
                {translations[normalizedLanguage].usagePolicy.rules.map((rule, index) => (
                  <li key={index} className="text-gray-600 leading-relaxed">{rule}</li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Electronic Links</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.electronicLinks}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Property Rights</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.propertyRights}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Disclaimer Policy</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.disclaimerPolicy}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Limitation of Liability</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.limitationOfLiability}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Virus Protection</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.virusProtection}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Waiver of Claims</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.waiverOfClaims}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Compensation</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.compensation}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Termination of Access</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].usagePolicy.terminationOfAccess}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Judicial Reference</h4>
              <p className="text-gray-600 leading-relaxed">{translations[normalizedLanguage].usagePolicy.judicialReference}</p>
            </div>
          ) : activeSection === 'return' ? (
            <div className="lg:w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{translations[normalizedLanguage].returnExchangePolicy.title}</h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">{translations[normalizedLanguage].returnExchangePolicy.subtitle}</h3>
              <p className="text-sm text-gray-500 mb-6">{translations[normalizedLanguage].returnExchangePolicy.lastUpdated}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Return Policy</h4>
              <p className="text-gray-600 leading-relaxed">{translations[normalizedLanguage].returnExchangePolicy.returnPolicy}</p>
            </div>
          ) : activeSection === 'privacy' ? (
            <div className="lg:w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{translations[normalizedLanguage].privacyPolicy.title}</h2>
              <h3 className="text-xl font-medium text-gray-700 mb-3">{translations[normalizedLanguage].privacyPolicy.subtitle}</h3>
              <p className="text-sm text-gray-500 mb-6">{translations[normalizedLanguage].privacyPolicy.lastUpdated}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Privacy and Information Confidentiality Statement</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.intro}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Browsing</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.browsing}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Internet Protocol (IP) Address</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.ipAddress}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Online Surveys</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.onlineSurveys}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Links to Other Websites on the Internet</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.linksToOtherSites}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Information Disclosure</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.informationDisclosure}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Data Needed for Your Required Transactions</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.dataForTransactions}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">When Contacting Us</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.whenContactingUs}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Information Disclosure to Third Parties</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.disclosureToThirdParties}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Amendments to the Privacy and Data Confidentiality Policy</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.amendments}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Contacting Us</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{translations[normalizedLanguage].privacyPolicy.contactingUs}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">In Conclusion</h4>
              <p className="text-gray-600 leading-relaxed">{translations[normalizedLanguage].privacyPolicy.conclusion}</p>
            </div>
          ) : (
            <div className="lg:w-full bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-center">Section not found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Contact;