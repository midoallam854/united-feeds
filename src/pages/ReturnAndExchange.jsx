import React from 'react';
import about from '../assets/about.png';

const ReturnAndExchange = ({ language = 'en' }) => {
  const translations = {
    en: {
      returnExchangePolicy: 'Return & Exchange Policy',
      lastUpdated: 'Last Updated: March 10, 2025',
      returnPolicy: 'Return Policy',
      returnPolicyText: 'Products can be returned in the following cases:',
      returnCases: [
        {
          title: 'If the product does not match the description agreed upon in the invoice:',
          details: [
            'The product must be in its original condition and accompanied by the invoice.',
            'All products can be returned within a period not exceeding 3 days from the date of receiving the order, to maintain the product\'s quality and preservation.',
          ],
        },
        {
          title: 'If the product is damaged from the same date of receiving the order:',
          details: [
            'After confirmation from our quality team, the product will be replaced for the customer.',
          ],
        },
      ],
    },
    ar: {
      returnExchangePolicy: 'سياسة الإرجاع والاستبدال',
      lastUpdated: 'آخر تحديث: 10 مارس 2025',
      returnPolicy: 'سياسة الإرجاع',
      returnPolicyText: 'يمكن إرجاع المنتجات في الحالات التالية:',
      returnCases: [
        {
          title: 'إذا لم يتطابق المنتج مع الوصف المتفق عليه في الفاتورة:',
          details: [
            'يجب أن يكون المنتج في حالته الأصلية ومرفقًا مع الفاتورة.',
            'يمكن إرجاع جميع المنتجات خلال فترة لا تتجاوز 3 أيام من تاريخ استلام الطلب، للحفاظ على جودة المنتج وصيانته.',
          ],
        },
        {
          title: 'إذا كان المنتج تالفًا من تاريخ استلام الطلب:',
          details: [
            'بعد التأكيد من فريق الجودة لدينا، سيتم استبدال المنتج للعميل.',
          ],
        },
      ],
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
              {translations[language].returnExchangePolicy}
            </h1>
            <p className="mt-2 text-white text-sm opacity-80">
              {translations[language].lastUpdated}
            </p>
          </div>

          <section className="mt-16 space-y-6 fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {translations[language].returnPolicy}
            </h2>
            <p className="text-white leading-relaxed text-base font-medium">
              {translations[language].returnPolicyText}
            </p>

            <ol className="list-decimal list-outside space-y-6 text-white text-base font-medium">
              {translations[language].returnCases.map((caseItem, index) => (
                <li key={index} className="font-semibold">
                  {caseItem.title}
                  <ul className="mt-3 space-y-3 text-white list-disc">
                    {caseItem.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="font-medium">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnAndExchange;