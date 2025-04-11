import React, { useEffect, useState } from 'react';
import about from "../assets/about.png";

const PrivacyAndPolicy = ({ language = 'en' }) => {
  const [loading, setLoading] = useState(true); // Add loading state for initial page load

  const translations = {
    en: {
      privacyPolicy: 'Privacy Policy',
      lastUpdated: 'Last Updated: March 10, 2025',
      privacyStatement: 'Privacy and Information Confidentiality Statement',
      privacyStatementText: 'We appreciate your concerns and interests regarding the privacy of your data on the Internet. This policy has been prepared to help you understand the nature of the data we collect from you when you visit our website or use our internet application and how we handle this personal data.',
      browsing: 'Browsing',
      browsingText: 'We have not designed this website or application to collect your personal data from your computer while browsing this website or application. Only data provided by you with your knowledge and free will shall be used.',
      ipAddress: 'Internet Protocol (IP) Address',
      ipAddressText: 'At any time you visit any website, including this website or application, the host server will record your Internet Protocol (IP) address, date and time of your visit, and the type of web browser you are using, along with the URL address of any website that referred you to this website.',
      onlineSurveys: 'Online Surveys',
      onlineSurveysText: 'The online surveys we conduct directly on the web enable us to collect specific data regarding your opinions and feelings about our website or application. Your responses are of utmost importance and highly appreciated as they allow us to improve the website and the application. You have complete freedom and choice in providing data related to your name and other information.',
      linksToOtherWebsites: 'Links to Other Websites on the Internet',
      linksToOtherWebsitesText: 'Our website may include links to other websites or advertisements from other websites, such as Google AdSense. We are not responsible for data collection methods by those websites. You can review the privacy policies and content of those websites accessed through any link within this website.',
      informationDisclosure: 'Information Disclosure',
      informationDisclosureText: 'We will always maintain the privacy and confidentiality of all personal data we obtain. This information will not be disclosed unless required by any law or when we believe in good faith that such action is necessary or desirable to comply with the law or defend or protect the rights of the property of this website or the parties benefiting from it.',
      dataForTransactions: 'Data Needed for Your Required Transactions',
      dataForTransactionsText: [
        'When we need any data that is specific to you, we will ask you to provide it of your own free will.',
        'This information will help us to contact you and execute your requests wherever possible.',
        'Your provided data will never be sold to any third party for marketing purposes without your prior and written consent, unless it is included in aggregated data used for statistical and research purposes without any information that can identify you.',
      ],
      whenContactingUs: 'When Contacting Us',
      whenContactingUsText: 'All data provided by you will be treated as confidential. The forms presented directly on the web require providing data that will help us improve our website. The data you provide will be used to respond to all your inquiries, feedback, or requests by this website or any of its affiliated sites.',
      disclosureToThirdParties: 'Information Disclosure to Third Parties',
      disclosureToThirdPartiesText: 'We will not sell, trade, rent, or disclose any information for the benefit of any third party outside of this website, application, or its affiliated sites. Information will only be disclosed in the event of an order from any judicial or regulatory authority.',
      amendments: 'Amendments to the Privacy and Data Confidentiality Policy',
      amendmentsText: 'We reserve the right to amend the terms and conditions of the Privacy and Data Confidentiality Policy if necessary and when it is appropriate. Amendments will be implemented here, and you will be continuously notified of the data we obtain, how we will use it, and the parties to whom we will provide this data.',
      contactingUs: 'Contacting Us',
      contactingUsText: "You can contact us when needed by clicking on the 'Contact Us' link available on our website or application, or by contacting us at the toll-free number 920006839.",
      inConclusion: 'In Conclusion',
      inConclusionText: 'Your concerns and interests regarding data confidentiality and privacy are of the utmost importance to us. We hope to achieve this through this policy.',
    },
    ar: {
      privacyPolicy: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: 10 مارس 2025',
      privacyStatement: 'بيان الخصوصية وسرية المعلومات',
      privacyStatementText: 'نقدر اهتماماتكم ومخاوفكم بشأن خصوصية بياناتكم على الإنترنت. تم إعداد هذه السياسة لمساعدتكم على فهم طبيعة البيانات التي نجمعها منكم عند زيارة موقعنا الإلكتروني أو استخدام تطبيقنا على الإنترنت وكيفية تعاملنا مع هذه البيانات الشخصية.',
      browsing: 'التصفح',
      browsingText: 'لم يتم تصميم هذا الموقع أو التطبيق لجمع بياناتك الشخصية من جهاز الكمبيوتر الخاص بك أثناء تصفح هذا الموقع أو التطبيق. سيتم استخدام البيانات التي تقدمها بنفسك وبمعرفتك وإرادتك الحرة فقط.',
      ipAddress: 'عنوان بروتوكول الإنترنت (IP)',
      ipAddressText: 'في أي وقت تزور فيه أي موقع إلكتروني، بما في ذلك هذا الموقع أو التطبيق، سيقوم الخادم المضيف بتسجيل عنوان بروتوكول الإنترنت (IP) الخاص بك، وتاريخ ووقت زيارتك، ونوع متصفح الويب الذي تستخدمه، إلى جانب عنوان URL لأي موقع ويب أحالك إلى هذا الموقع.',
      onlineSurveys: 'الاستطلاعات عبر الإنترنت',
      onlineSurveysText: 'الاستطلاعات عبر الإنترنت التي نجريها مباشرة على الويب تمكننا من جمع بيانات محددة تتعلق بآرائك ومشاعرك حول موقعنا الإلكتروني أو تطبيقنا. ردودك ذات أهمية قصوى ومحل تقدير كبير حيث تتيح لنا تحسين الموقع والتطبيق. لديك الحرية الكاملة والخيار في تقديم البيانات المتعلقة باسمك ومعلومات أخرى.',
      linksToOtherWebsites: 'روابط لمواقع أخرى على الإنترنت',
      linksToOtherWebsitesText: 'قد يتضمن موقعنا الإلكتروني روابط لمواقع أخرى أو إعلانات من مواقع أخرى، مثل Google AdSense. نحن لسنا مسؤولين عن طرق جمع البيانات من قبل تلك المواقع. يمكنك مراجعة سياسات الخصوصية ومحتوى تلك المواقع التي يتم الوصول إليها من خلال أي رابط ضمن هذا الموقع.',
      informationDisclosure: 'الكشف عن المعلومات',
      informationDisclosureText: 'سنحافظ دائمًا على خصوصية وسرية جميع البيانات الشخصية التي نحصل عليها. لن يتم الكشف عن هذه المعلومات إلا إذا كان ذلك مطلوبًا بموجب أي قانون أو عندما نعتقد بحسن نية أن مثل هذا الإجراء ضروري أو مرغوب فيه للامتثال للقانون أو للدفاع عن حقوق الملكية لهذا الموقع أو الأطراف المستفيدة منه أو حمايتها.',
      dataForTransactions: 'البيانات اللازمة للمعاملات المطلوبة الخاصة بك',
      dataForTransactionsText: [
        'عندما نحتاج إلى أي بيانات خاصة بك، سنطلب منك تقديمها بمحض إرادتك.',
        'ستساعدنا هذه المعلومات في التواصل معك وتنفيذ طلباتك حيثما أمكن ذلك.',
        'لن يتم بيع البيانات التي تقدمها لأي طرف ثالث لأغراض التسويق دون موافقتك المسبقة والمكتوبة، ما لم يتم تضمينها في بيانات مجمعة تُستخدم لأغراض إحصائية وبحثية دون أي معلومات يمكن أن تحدد هويتك.',
      ],
      whenContactingUs: 'عند التواصل معنا',
      whenContactingUsText: 'سيتم التعامل مع جميع البيانات التي تقدمها على أنها سرية. تتطلب النماذج المقدمة مباشرة على الويب تقديم بيانات ستساعدنا في تحسين موقعنا الإلكتروني. سيتم استخدام البيانات التي تقدمها للرد على جميع استفساراتك، تعليقاتك، أو طلباتك من قبل هذا الموقع أو أي من المواقع التابعة له.',
      disclosureToThirdParties: 'الكشف عن المعلومات لأطراف ثالثة',
      disclosureToThirdPartiesText: 'لن نبيع، نتاجر، نؤجر، أو نكشف عن أي معلومات لصالح أي طرف ثالث خارج هذا الموقع، التطبيق، أو المواقع التابعة له. سيتم الكشف عن المعلومات فقط في حالة وجود أمر من أي سلطة قضائية أو تنظيمية.',
      amendments: 'التعديلات على سياسة الخصوصية وسرية البيانات',
      amendmentsText: 'نحتفظ بالحق في تعديل شروط وأحكام سياسة الخصوصية وسرية البيانات إذا لزم الأمر وعندما يكون ذلك مناسبًا. سيتم تنفيذ التعديلات هنا، وسيتم إعلامك باستمرار بالبيانات التي نحصل عليها، وكيف سنستخدمها، والأطراف التي سنقدم لها هذه البيانات.',
      contactingUs: 'التواصل معنا',
      contactingUsText: 'يمكنك التواصل معنا عند الحاجة بالنقر على رابط "اتصل بنا" المتوفر على موقعنا الإلكتروني أو تطبيقنا، أو بالاتصال بنا على الرقم المجاني 920006839.',
      inConclusion: 'في الختام',
      inConclusionText: 'مخاوفك واهتماماتك بشأن سرية البيانات والخصوصية هي ذات أهمية قصوى بالنسبة لنا. نأمل أن نحقق ذلك من خلال هذه السياسة.',
    },
  };

  useEffect(() => {
    // Simulate a loading delay for the initial page load
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        style={{ backgroundImage: `url(${about})` }}
        className="bg-cover bg-center relative overflow-hidden min-h-screen"
      >
        <div className="absolute inset-0 bg-overlay" /> {/* Dark overlay for readability */}
        <div className={`container px-6 sm:px-8 lg:px-12 py-20 max-w-6xl ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <div className="fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">
              {translations[language].privacyPolicy}
            </h1>
            <p className="mt-2 text-white text-sm opacity-80">
              {translations[language].lastUpdated}
            </p>
          </div>

          <section className="mt-16 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].privacyStatement}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].privacyStatementText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].browsing}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].browsingText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].ipAddress}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].ipAddressText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].onlineSurveys}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].onlineSurveysText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].linksToOtherWebsites}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].linksToOtherWebsitesText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].informationDisclosure}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].informationDisclosureText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].dataForTransactions}</h2>
            {translations[language].dataForTransactionsText.map((text, index) => (
              <p key={index} className="text-lg text-white leading-relaxed font-medium mt-3">
                {text}
              </p>
            ))}
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].whenContactingUs}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].whenContactingUsText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].disclosureToThirdParties}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].disclosureToThirdPartiesText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].amendments}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].amendmentsText}
            </p>
          </section>

          <section className="mt-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].contactingUs}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].contactingUsText}
            </p>
          </section>

          <section className="mt-12 mb-12 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{translations[language].inConclusion}</h2>
            <p className="text-lg text-white leading-relaxed font-medium">
              {translations[language].inConclusionText}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;