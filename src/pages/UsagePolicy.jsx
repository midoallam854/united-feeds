import React from 'react';
import about from '../assets/about.png';

const UsagePolicy = ({ language = 'en' }) => {
  const translations = {
    en: {
      usagePolicy: 'Usage Policy',
      lastUpdated: 'Last Updated: March 10, 2025',
      introText:
        "This is the website of the United Feeds Company in the Kingdom of Saudi Arabia (referred to as 'the website' or 'the website'). It is available for the personal use of site visitors. Visitor access and use of this site are subject to these terms and conditions and the laws of the Kingdom of Saudi Arabia. The visitor's entry and use of this site constitute an unconditional agreement to the terms and conditions of use, whether registered or not. This agreement takes effect from the first use of this site - This website provides information, data, and services related to the business of the United Feeds Company (referred to as United Feeds Company). By using this website, you acknowledge and agree to refrain from the following:",
      prohibitedActions: [
        'Providing or uploading files that contain software, materials, data, or other information that you do not own or have a license for.',
        'Using this site in any way to send any commercial or unwanted email or any form of abuse.',
        'Providing or uploading files on this site that contain viruses or corrupted data.',
        'Publishing, advertising, distributing, or disseminating materials or information that defame, violate regulations, contain obscene or indecent content, or are in violation of public morality, or any illegal materials or information through the site.',
        'Engaging through this site in unlawful or irregular activities within the Kingdom of Saudi Arabia.',
        'Advertising on this site any product or service that puts us in violation of any applicable law or regulation in any field.',
        'Using any means, software, or actions to obstruct or attempt to obstruct the proper operation of the site.',
        "Taking any action that unreasonably or inappropriately imposes an undue or excessive burden on the site's infrastructure.",
      ],
      electronicLinks: 'Electronic Links',
      electronicLinksText:
        "The United Feeds Company's website may contain electronic links to other websites or portals that may use methods to protect information and privacy different from ours. We are not responsible for the content, methods, and privacy of these other websites, and we recommend referring to their privacy notices.",
      propertyRights: 'Property Rights',
      propertyRightsText:
        "This website is owned by the United Feeds Company. All website content, including software and information, is fully protected in accordance with Saudi copyright, trademark, and various property rights laws. Furthermore, all intellectual property rights for the website's content belong to the United Feeds Company. Except as otherwise indicated, you may not sell, license, rent, modify, copy, reproduce, reprint, download, advertise, transmit, distribute, publicly display, edit, or create derivative works from any materials or content from this website for public or commercial purposes without prior written consent from the website's management. Any modification of the website's content is strictly prohibited. In addition, the graphics and images on this website are protected by copyright, and may not be copied or used in any way without prior written consent from the website's management.",
      disclaimerPolicy: 'Disclaimer Policy',
      disclaimerPolicyText: [
        "This website is a private website managed by the United Feeds Company. Its content is published in collaboration with other government entities. The United Feeds Company does not guarantee the full accuracy and correctness of the website's content, as some information may change. Therefore, the company assumes no responsibility or consequences resulting from the use of the information provided on the website, including:",
        'Accuracy and correctness of information.',
        'Effectiveness in preventing breaches.',
        'Relevance of the website content.',
        'Continuity or validity.',
        'Absence of viruses or harmful elements on the website or server.',
        "The company is not legally responsible for any loss or damage of any kind (direct or indirect) resulting from the use of this website.",
        "The servers operating the site automatically collect visitors' IP addresses when they visit one of the organization's websites. The IP address is used to help diagnose server problems and to perform statistics on its usage. The site uses cookies, and these files help users navigate the site easily. If desired, these files can be used to remember passwords and facilitate and speed up the login process to some sites. These files are stored on the computer's hard drive.",
      ],
      limitationOfLiability: 'Limitation of Liability',
      limitationOfLiabilityText:
        'The electronic services and data provided by the website of the United Company for Feeds and obtaining any information about various government entities are only provided to facilitate manual procedures. By this, the user acknowledges full awareness that Internet communications may be subject to interception or interception by others, and that the website does not replace the information available through official authorities, and that requests and administrative procedures can be taken directly with the relevant authorities.',
      virusProtection: 'Virus Protection',
      virusProtectionText:
        'The company makes every effort to examine and test the contents of this website at all stages of its preparation, and visitors are always advised to run an up-to-date antivirus program on all materials downloaded from the Internet. The company is not responsible for any loss, interruption, data damage to the user, their personal computer, or any damage that may occur when connecting to this website or using any material contained therein.',
      waiverOfClaims: 'Waiver of Claims',
      waiverOfClaimsText:
        "In its entirety, the website of the United Feeds Company, including all its information, services, materials, and functions, or that which can be accessed through the website, is provided for your personal use as is, without any acknowledgments, promises, or warranties of any kind. The website's administration cannot guarantee or be held responsible for any interruptions, errors, or violations that may arise from using this website, its content, or any associated site, whether with or without the knowledge of the website's administration. Any communications or information sent by the user through this website shall not grant them ownership or the right to guarantee its confidentiality. Additionally, any interactive use contained within this website does not imply or intend to guarantee any rights, licenses, or privileges of any kind to the user.",
      compensation: 'Compensation',
      compensationText:
        'By this, the user acknowledges not to take any action against the United Feeds Company or any of its management, and to indemnify and secure them from liability, as well as any parties or employees responsible for the management, maintenance, update, or provision of the website, from any and all obligations and responsibilities that may arise in connection with any claim arising from any violation on their part of the terms and conditions of use, or any of the prevailing laws, whether in the Kingdom of Saudi Arabia or the place where they reside.',
      terminationOfAccess: 'Termination of Access',
      terminationOfAccessText:
        'The United Feeds Company may, at its absolute discretion, terminate, restrict, or suspend your right to access and use the website without notice and for any reason, including a violation of the terms and conditions of use or any other behavior we may consider, at our discretion, to be unlawful or harmful to others. In the event of termination, you will not be permitted to access this website.',
      judicialReference: 'Judicial Reference',
      judicialReferenceText:
        'By this, the user exclusively agrees to submit to the judicial authorities in the Kingdom of Saudi Arabia regarding all claims and disputes arising from your use of this website.',
    },
    ar: {
      usagePolicy: 'سياسة الاستخدام',
      lastUpdated: 'آخر تحديث: 10 مارس 2025',
      introText:
        "هذا هو الموقع الإلكتروني لشركة الأعلاف المتحدة في المملكة العربية السعودية (يُشار إليه بـ 'الموقع' أو 'الموقع الإلكتروني'). وهو متاح للاستخدام الشخصي لزوار الموقع. يخضع وصول الزائر واستخدامه لهذا الموقع لهذه الشروط والأحكام وقوانين المملكة العربية السعودية. يشكل دخول الزائر واستخدامه لهذا الموقع موافقة غير مشروطة على شروط وأحكام الاستخدام، سواء كان مسجلاً أم لا. يسري هذا الاتفاق من الاستخدام الأول لهذا الموقع - يوفر هذا الموقع الإلكتروني معلومات وبيانات وخدمات تتعلق بأعمال شركة الأعلاف المتحدة (يُشار إليها باسم شركة الأعلاف المتحدة). باستخدام هذا الموقع، فإنك تقر وتوافق على الامتناع عن الأمور التالية:",
      prohibitedActions: [
        'تقديم أو رفع ملفات تحتوي على برامج، مواد، بيانات، أو معلومات أخرى لا تملكها أو ليس لديك ترخيص لها.',
        'استخدام هذا الموقع بأي شكل لإرسال أي بريد إلكتروني تجاري أو غير مرغوب فيه أو أي شكل من أشكال الإساءة.',
        'تقديم أو رفع ملفات على هذا الموقع تحتوي على فيروسات أو بيانات تالفة.',
        'نشر، الإعلان، التوزيع، أو نشر مواد أو معلومات تشوه السمعة، تنتهك اللوائح، تحتوي على محتوى فاحش أو غير لائق، أو تنتهك الأخلاق العامة، أو أي مواد أو معلومات غير قانونية من خلال الموقع.',
        'الانخراط من خلال هذا الموقع في أنشطة غير قانونية أو غير نظامية داخل المملكة العربية السعودية.',
        'الإعلان على هذا الموقع عن أي منتج أو خدمة تجعلنا في انتهاك لأي قانون أو لائحة سارية في أي مجال.',
        'استخدام أي وسيلة، برنامج، أو إجراءات لعرقلة أو محاولة عرقلة التشغيل السليم للموقع.',
        'اتخاذ أي إجراء يفرض عبئًا غير معقول أو غير مناسب بشكل مفرط على بنية الموقع التحتية.',
      ],
      electronicLinks: 'الروابط الإلكترونية',
      electronicLinksText:
        'قد يحتوي موقع شركة الأعلاف المتحدة على روابط إلكترونية لمواقع أو بوابات أخرى قد تستخدم طرقًا لحماية المعلومات والخصوصية تختلف عن طرقنا. نحن لسنا مسؤولين عن المحتوى، الطرق، وخصوصية هذه المواقع الأخرى، ونوصي بالرجوع إلى إشعارات الخصوصية الخاصة بها.',
      propertyRights: 'حقوق الملكية',
      propertyRightsText:
        'هذا الموقع مملوك لشركة الأعلاف المتحدة. جميع محتويات الموقع، بما في ذلك البرامج والمعلومات، محمية بالكامل وفقًا لقوانين حقوق الطبع والنشر، العلامات التجارية، وحقوق الملكية المختلفة في المملكة العربية السعودية. علاوة على ذلك، جميع حقوق الملكية الفكرية لمحتوى الموقع تعود لشركة الأعلاف المتحدة. ما لم يُذكر خلاف ذلك، لا يجوز لك بيع، ترخيص، تأجير، تعديل، نسخ، إعادة إنتاج، إعادة طباعة، تنزيل، الإعلان، نقل، توزيع، عرض علني، تحرير، أو إنشاء أعمال مشتقة من أي مواد أو محتوى من هذا الموقع لأغراض عامة أو تجارية دون موافقة كتابية مسبقة من إدارة الموقع. يُمنع منعًا باتًا أي تعديل لمحتوى الموقع. بالإضافة إلى ذلك، الصور والرسومات على هذا الموقع محمية بحقوق الطبع والنشر، ولا يجوز نسخها أو استخدامها بأي شكل دون موافقة كتابية مسبقة من إدارة الموقع.',
      disclaimerPolicy: 'سياسة الإخلاء من المسؤولية',
      disclaimerPolicyText: [
        'هذا الموقع هو موقع خاص تُديره شركة الأعلاف المتحدة. يتم نشر محتواه بالتعاون مع جهات حكومية أخرى. لا تضمن شركة الأعلاف المتحدة الدقة والصحة الكاملة لمحتوى الموقع، حيث قد تتغير بعض المعلومات. لذلك، لا تتحمل الشركة أي مسؤولية أو عواقب ناتجة عن استخدام المعلومات المقدمة على الموقع، بما في ذلك:',
        'دقة وصحة المعلومات.',
        'الفعالية في منع الانتهاكات.',
        'ملاءمة محتوى الموقع.',
        'الاستمرارية أو الصلاحية.',
        'خلو الموقع أو الخادم من الفيروسات أو العناصر الضارة.',
        'الشركة غير مسؤولة قانونيًا عن أي خسارة أو ضرر من أي نوع (مباشر أو غير مباشر) ناتج عن استخدام هذا الموقع.',
        'تجمع الخوادم التي تشغل الموقع عناوين IP الخاصة بالزوار تلقائيًا عند زيارتهم لأحد مواقع المنظمة. يُستخدم عنوان IP للمساعدة في تشخيص مشاكل الخادم ولإجراء إحصاءات حول استخدامه. يستخدم الموقع ملفات تعريف الارتباط (cookies)، وتساعد هذه الملفات المستخدمين على التنقل في الموقع بسهولة. إذا رغبت في ذلك، يمكن استخدام هذه الملفات لتذكر كلمات المرور وتسهيل وتسريع عملية تسجيل الدخول إلى بعض المواقع. تُخزن هذه الملفات على القرص الصلب للكمبيوتر.',
      ],
      limitationOfLiability: 'تحديد المسؤولية',
      limitationOfLiabilityText:
        'الخدمات الإلكترونية والبيانات المقدمة من موقع شركة الأعلاف المتحدة والحصول على أي معلومات حول جهات حكومية مختلفة تُقدم فقط لتسهيل الإجراءات اليدوية. بذلك، يقر المستخدم بمعرفة كاملة بأن الاتصالات عبر الإنترنت قد تكون عرضة للاعتراض أو التدخل من قبل الآخرين، وأن الموقع لا يحل محل المعلومات المتاحة من خلال السلطات الرسمية، وأن الطلبات والإجراءات الإدارية يمكن اتخاذها مباشرة مع الجهات المختصة.',
      virusProtection: 'الحماية من الفيروسات',
      virusProtectionText:
        'تبذل الشركة كل جهد لفحص واختبار محتويات هذا الموقع في جميع مراحل إعداده، ويُنصح الزوار دائمًا بتشغيل برنامج مكافحة فيروسات محدث على جميع المواد التي يتم تنزيلها من الإنترنت. الشركة غير مسؤولة عن أي خسارة، انقطاع، تلف بيانات المستخدم، جهاز الكمبيوتر الشخصي الخاص به، أو أي ضرر قد يحدث عند الاتصال بهذا الموقع أو استخدام أي مادة واردة فيه.',
      waiverOfClaims: 'التنازل عن المطالبات',
      waiverOfClaimsText:
        'بكاملها، يُقدم موقع شركة الأعلاف المتحدة، بما في ذلك جميع معلوماته، خدماته، مواده، ووظائفه، أو ما يمكن الوصول إليه من خلال الموقع، لاستخدامك الشخصي كما هو، دون أي تأكيدات، وعود، أو ضمانات من أي نوع. لا يمكن لإدارة الموقع ضمان أو تحمل المسؤولية عن أي انقطاعات، أخطاء، أو انتهاكات قد تنشأ من استخدام هذا الموقع، محتواه، أو أي موقع مرتبط، سواء بمعرفة إدارة الموقع أو بدونها. أي اتصالات أو معلومات يرسلها المستخدم من خلال هذا الموقع لن تمنحه ملكية أو الحق في ضمان سريتها. بالإضافة إلى ذلك، أي استخدام تفاعلي وارد ضمن هذا الموقع لا يعني أو يهدف إلى ضمان أي حقوق، تراخيص، أو امتيازات من أي نوع للمستخدم.',
      compensation: 'التعويض',
      compensationText:
        'بذلك، يقر المستخدم بعدم اتخاذ أي إجراء ضد شركة الأعلاف المتحدة أو أي من إدارتها، وتعويضهم وحمايتهم من المسؤولية، وكذلك أي أطراف أو موظفين مسؤولين عن إدارة، صيانة، تحديث، أو توفير الموقع، من أي وجميع الالتزامات والمسؤوليات التي قد تنشأ فيما يتعلق بأي مطالبة تنشأ عن أي انتهاك من جانبهم لشروط وأحكام الاستخدام، أو أي من القوانين السائدة، سواء في المملكة العربية السعودية أو المكان الذي يقيمون فيه.',
      terminationOfAccess: 'إنهاء الوصول',
      terminationOfAccessText:
        'يجوز لشركة الأعلاف المتحدة، وفقًا لتقديرها المطلق، إنهاء، تقييد، أو تعليق حقك في الوصول واستخدام الموقع دون إشعار ولأي سبب، بما في ذلك انتهاك شروط وأحكام الاستخدام أو أي سلوك آخر قد نعتبره، وفقًا لتقديرنا، غير قانوني أو ضار بالآخرين. في حالة الإنهاء، لن يُسمح لك بالوصول إلى هذا الموقع.',
      judicialReference: 'المرجع القضائي',
      judicialReferenceText:
        'بذلك، يوافق المستخدم حصريًا على الخضوع للسلطات القضائية في المملكة العربية السعودية فيما يتعلق بجميع المطالبات والنزاعات الناشئة عن استخدامك لهذا الموقع.',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        style={{ backgroundImage: `url(${about})` }}
        className="bg-cover bg-center relative overflow-hidden min-h-screen"
      >
        <div className="absolute inset-0 bg-overlay" />
        <div className={`container px-6 sm:px-8 lg:px-12 py-20 max-w-6xl ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <div className="fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">
              {translations[language].usagePolicy}
            </h1>
            <p className="mt-2 text-white text-sm opacity-80">
              {translations[language].lastUpdated}
            </p>
          </div>

          <section className="mt-16 fade-in">
            <p className="text-white leading-relaxed text-lg font-medium">
              {translations[language].introText}
            </p>
            <ol className="list-decimal list-outside mt-6 space-y-4 text-white text-lg font-medium">
              {translations[language].prohibitedActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ol>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].electronicLinks}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].electronicLinksText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].propertyRights}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].propertyRightsText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].disclaimerPolicy}
            </h2>
            {translations[language].disclaimerPolicyText.map((text, index) => (
              <p
                key={index}
                className={`text-lg text-white leading-relaxed font-medium ${index === 0 ? '' : 'mt-4'}`}
              >
                {index > 0 && index <= 5 ? <span className="mr-2">•</span> : null}
                {text}
              </p>
            ))}
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].limitationOfLiability}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].limitationOfLiabilityText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].virusProtection}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].virusProtectionText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].waiverOfClaims}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].waiverOfClaimsText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].compensation}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].compensationText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].terminationOfAccess}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].terminationOfAccessText}
            </p>
          </section>

          <section className="mt-12 mb-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              {translations[language].judicialReference}
            </h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].judicialReferenceText}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UsagePolicy;