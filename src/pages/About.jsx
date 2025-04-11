import React, { useEffect, useState } from 'react';
import about from "../assets/about.png";
import aboutImg1 from "../assets/aboutImg1.png";
import aboutImg2 from "../assets/aboutImg2.png";
import aboutImg3 from "../assets/aboutImg3.png";
import aboutImg4 from "../assets/aboutImg4.png";
import aboutImg5 from "../assets/aboutImg5.png";
import aboutImg6 from "../assets/aboutImg6.png";

const About = ({ language = 'en' }) => {
  const [loading, setLoading] = useState(true); // Add loading state for initial page load

  const translations = {
    en: {
      home: 'Home',
      aboutUs: 'About Us',
      description: 'United Feed Company is one of the leading companies globally and locally in the field of importing and trading barley and bulk grains for animal feed uses. It operates through all its seven stations in its strategic areas by distributing and packaging barley and feed to spread throughout the Kingdom, recognizing the importance of enabling local producers to obtain their needs, raising the efficiency of animal production, and supporting food security in Saudi Arabia.',
      ourMission: 'Our Mission',
      missionText: 'To build an integrated and sustainable system that aims to guarantee food security while also being able to adapt to continuous changes, maintain the excellence of our brand and product quality, and continue to earn our customers’ trust through commitment, trust, and responsibility.',
      ourVision: 'Our Vision',
      visionText: 'To set new standards and develop innovative ideas to redefine the meaning of quality and excellence in the barley and feed trade to always remain the first choice locally and globally.',
      ourGoals: 'Our Goals',
      goals: [
        'Contribute to maintaining the food security of Saudi Arabia',
        'Increase the productivity of animal production sector',
        'Empower local producers to obtain their needs',
        'Enhance the economics of food industry in Saudi Arabia',
        'Preserve the natural resources of Saudi Arabia',
      ],
      ourServices: 'Our Services',
      services: [
        'Redesigning Formulas',
        'Storage',
        'Logistic',
        'Feeds (Including Complete Feeds)',
        'Animal Feed Raw Materials',
      ],
      whatDistinguishesUs: 'What Distinguishes Us?',
      distinguishes: [
        'Leader in the Market',
        'Largest Storage capacity in Saudi Arabia',
        'Supports Food Security in Saudi Arabia',
        'Available in 7 stations',
        'ERP and advanced formulation systems',
        'Imported products from best farms',
        'Fast services',
        'Stable prices',
        'Close to customers',
        'Well Experienced team in all levels',
      ],
      ourValues: 'Our Values',
      values: [
        'Quality and Authenticity a constant, uncompromising essence with the passage of time and data differences',
        'Integrity is the foundation and the bedrock upon which everything else is built',
        'Teamwork the fastest and most successful way to achieve the goal',
        'Commitment is the effort, the quality of performance and the fulfillment of the promise',
        'Building strong relationships a sail of trust that leads us to the meaning of life',
        'Promoting a sense of healthy living the most important principle, purpose and destination',
      ],
    },
    ar: {
      home: 'الرئيسية',
      aboutUs: 'معلومات عنا',
      description: 'شركة الأعلاف المتحدة هي واحدة من الشركات الرائدة عالميًا ومحليًا في مجال استيراد وتجارة الشعير والحبوب السائبة لاستخدامات أعلاف الحيوانات. تعمل من خلال جميع محطاتها السبع في مناطقها الاستراتيجية من خلال توزيع وتغليف الشعير والأعلاف لتنتشر في جميع أنحاء المملكة، مدركة أهمية تمكين المنتجين المحليين من الحصول على احتياجاتهم، ورفع كفاءة الإنتاج الحيواني، ودعم الأمن الغذائي في المملكة العربية السعودية.',
      ourMission: 'مهمتنا',
      missionText: 'بناء نظام متكامل ومستدام يهدف إلى ضمان الأمن الغذائي مع القدرة على التكيف مع التغيرات المستمرة، والحفاظ على تميز علامتنا التجارية وجودة منتجاتنا، ومواصلة كسب ثقة عملائنا من خلال الالتزام والثقة والمسؤولية.',
      ourVision: 'رؤيتنا',
      visionText: 'وضع معايير جديدة وتطوير أفكار مبتكرة لإعادة تعريف معنى الجودة والتميز في تجارة الشعير والأعلاف لنظل دائمًا الخيار الأول محليًا وعالميًا.',
      ourGoals: 'أهدافنا',
      goals: [
        'المساهمة في الحفاظ على الأمن الغذائي للمملكة العربية السعودية',
        'زيادة إنتاجية قطاع الإنتاج الحيواني',
        'تمكين المنتجين المحليين من الحصول على احتياجاتهم',
        'تعزيز اقتصاديات صناعة الغذاء في المملكة العربية السعودية',
        'الحفاظ على الموارد الطبيعية للمملكة العربية السعودية',
      ],
      ourServices: 'خدماتنا',
      services: [
        'إعادة تصميم الصيغ',
        'التخزين',
        'الخدمات اللوجستية',
        'الأعلاف (بما في ذلك الأعلاف الكاملة)',
        'المواد الخام لأعلاف الحيوانات',
      ],
      whatDistinguishesUs: 'ما يميزنا؟',
      distinguishes: [
        'رائد في السوق',
        'أكبر سعة تخزين في المملكة العربية السعودية',
        'يدعم الأمن الغذائي في المملكة العربية السعودية',
        'متوفر في 7 محطات',
        'نظام ERP وأنظمة صياغة متقدمة',
        'منتجات مستوردة من أفضل المزارع',
        'خدمات سريعة',
        'أسعار مستقرة',
        'قريب من العملاء',
        'فريق ذو خبرة عالية في جميع المستويات',
      ],
      ourValues: 'قيمنا',
      values: [
        'الجودة والأصالة جوهر ثابت لا يتغير مع مرور الوقت واختلاف البيانات',
        'النزاهة هي الأساس والصخرة التي يُبنى عليها كل شيء',
        'العمل الجماعي أسرع وأنجح طريقة لتحقيق الهدف',
        'الالتزام هو الجهد وجودة الأداء وتحقيق الوعد',
        'بناء علاقات قوية شراع من الثقة يقودنا إلى معنى الحياة',
        'تعزيز الشعور بالحياة الصحية المبدأ والغرض والوجهة الأهم',
      ],
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className={`text-sm breadcrumbs ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <ul className="flex space-x-2 text-gray-500">
            <li><a href="#" className="hover:text-[#78B833] transition-colors">{translations[language].home}</a></li>
            <li><span className="text-gray-400">/</span></li>
            <li><span>{translations[language].aboutUs}</span></li>
          </ul>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-8 tracking-tight">
          {translations[language].aboutUs}
        </h1>
      </div>

      <div
        style={{ backgroundImage: `url(${about})` }}
        className="bg-cover bg-center relative overflow-hidden min-h-screen"
      >
        <div className="absolute inset-0 bg-overlay" /> {/* Dark overlay for readability */}
        <div className={`container px-12 sm:px-16 lg:px-18 py-16 max-w-7xl ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <section className="mb-12 fade-in">
            <p className="text-gray-200 leading-relaxed font-medium text-lg">
              {translations[language].description}
            </p>
          </section>

          <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-1">
            <section className="fade-in">
              <h2 className="text-4xl font-semibold text-white mb-6">{translations[language].ourMission}</h2>
              <p className="text-gray-200 leading-relaxed font-medium text-lg">
                {translations[language].missionText}
              </p>
            </section>

            <section className="fade-in">
              <h2 className="text-4xl font-semibold text-white mb-6">{translations[language].ourVision}</h2>
              <p className="text-gray-200 leading-relaxed font-medium text-lg">
                {translations[language].visionText}
              </p>
            </section>

            <section className="fade-in">
              <h2 className="text-4xl font-semibold text-white mb-6">{translations[language].ourGoals}</h2>
              <ul className="text-gray-200 leading-relaxed font-medium text-lg list-disc space-y-3">
                {translations[language].goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-16 fade-in">
            <h2 className="text-4xl font-semibold text-white mb-6">{translations[language].ourServices}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-200 leading-relaxed font-medium text-lg">
              {translations[language].services.map((service) => (
                <div key={service} className="flex items-center space-x-3">
                  <span className="text-white text-2xl">•</span>
                  <p className="text-gray-200 leading-relaxed font-medium text-lg">{service}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 fade-in">
            <h2 className="text-4xl font-semibold text-white mb-6">{translations[language].whatDistinguishesUs}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-200 leading-relaxed font-medium text-lg">
              {translations[language].distinguishes.map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <span className="text-white text-2xl">•</span>
                  <p className="text-gray-200 leading-relaxed font-medium text-lg">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 fade-in">
            <h2 className="text-4xl font-semibold text-white text-center mb-10">{translations[language].ourValues}</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {translations[language].values.map((text, index) => (
                <div key={text} className="flex flex-col items-center text-center">
                  <img
                    src={[aboutImg1, aboutImg2, aboutImg3, aboutImg4, aboutImg5, aboutImg6][index]}
                    alt=""
                    className="w-24 h-24 mb-4 object-cover rounded-full shadow-lg"
                  />
                  <p className="text-gray-200 leading-relaxed font-medium text-lg">{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;