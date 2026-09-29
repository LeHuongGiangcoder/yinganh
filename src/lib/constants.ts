export type Lang = 'en' | 'vi';

export type AgendaMoment =
  | 'teaceremony'
  | 'vows'
  | 'photos'
  | 'welcome'
  | 'ceremony'
  | 'dinner'
  | 'party';

export const WEDDING = {
  groom: 'Ying-Chuan',
  bride: 'Minh Anh',
  dateISO: '2026-12-20T18:00:00+07:00',
  city: 'Ho Chi Minh',
  country: 'Vietnam',
  venue: 'The Reverie Saigon',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Reverie+Saigon+57-69F+Dong+Khoi',
  homeMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=284%2F8+Nguyen+Trong+Tuyen+Phu+Nhuan+Ho+Chi+Minh+City',
} as const;

type Family = {
  side: string;
  father: string;
  mother: string;
  address: string;
  childLabel: string;
  childName: string;
  rank: string;
  rite: string;
  riteNote: string;
};

export const COPY: Record<
  Lang,
  {
    entrance: { hint: string; whisper: string };
    hero: { eyebrow: string; dateLine: string; location: string; month: string };
    nav: {
      venue: string;
      schedule: string;
      dresscode: string;
      visa: string;
      travel: string;
      rsvp: string;
    };
    gallery: {
      subtitle: string;
      title: string;
      hint: string;
    };
    families: {
      subtitle: string;
      title: string;
      intro: string;
      groom: Family;
      bride: Family;
    };
    visa: {
      subtitle: string;
      title: string;
      introParagraph1: string;
      applyLabel: string;
      btnPortal: string;
      btnMoreInfo: string;
      keyDetails: { title: string; items: { value: string; label: string; description: string }[] };
      whatYouNeed: { title: string; items: string[] };
      afterApproval: { title: string; items: string[] };
      arrivalTips: { title: string; items: string[] };
    };
    travel: {
      subtitle: string;
      title: string;
      body: string;
      placesTitle: string;
      places: { name: string; desc: string }[];
      stay: {
        title: string;
        lead: string;
        rate: string;
        booking: string;
        areaTitle: string;
        areaLead: string;
        areas: string[];
      };
    };
    rsvp: {
      subtitle: string;
      title: string;
      description: string;
      nameLabel: string;
      namePlaceholder: string;
      attendingLabel: string;
      attendingYes: string;
      attendingNo: string;
      guestsLabel: string;
      guestsPlaceholder: string;
      mealLabel: string;
      mealPlaceholder: string;
      wishesLabel: string;
      wishesPlaceholder: string;
      submitBtn: string;
      successMsg: string;
      note: string;
    };
    thankYou: { title: string; body: string };
    eventDetails: {
      venueLabel: string;
      venueLines: string[];
      venueAddress: string;
      mapsBtn: string;
      guestCountLabel: string;
      guestCount: string;
      schedule: string;
      dresscode: string;
      agenda: {
        title: string;
        venue?: string;
        items: {
          time: string;
          end?: string;
          moment: AgendaMoment;
          title: string;
          description: string;
        }[];
      }[];
      dresscodeNote: string;
    };
  }
> = {
  en: {
    entrance: {
      hint: "Let's sketch with us",
      whisper: 'draw anywhere on the screen',
    },
    hero: {
      eyebrow: 'save the date',
      dateLine: 'Sunday, 20 December 2026',
      location: 'Ho Chi Minh, Vietnam',
      month: 'december',
    },
    nav: {
      venue: 'Venue',
      schedule: 'Schedule',
      dresscode: 'Dresscode',
      visa: 'Visa',
      travel: 'Travel',
      rsvp: 'RSVP',
    },
    gallery: {
      subtitle: 'MOMENTS OF US',
      title: 'Our Gallery',
      hint: 'scroll to view',
    },
    families: {
      subtitle: 'WITH THE BLESSING OF',
      title: 'Our Two Families',
      intro:
        'Two families, one from Taipei and one from Ho Chi Minh, would be honoured to welcome you on the day their only son and only daughter are married.',
      groom: {
        side: "The Groom's Family",
        father: 'Liao Ming-Chang',
        mother: 'Sue Wen-Ling',
        address: 'Taipei, Taiwan',
        childLabel: 'The Groom',
        childName: 'Liao Ying-Chuan',
        rank: 'Their only son',
        rite: 'Lễ Thành Hôn',
        riteNote: 'The wedding rite held by the groom’s family',
      },
      bride: {
        side: "The Bride's Family",
        father: 'Nguyễn Đăng Phong',
        mother: 'Trần Thị Phương Anh',
        address: '284/8 Nguyễn Trọng Tuyến, Phú Nhuận, Ho Chi Minh City',
        childLabel: 'The Bride',
        childName: 'Nguyễn Trần Minh Anh',
        rank: 'Their only daughter',
        rite: 'Lễ Vu Quy',
        riteNote: 'The bride is received at her family home, 09:00 on 20 December 2026',
      },
    },
    visa: {
      subtitle: 'TRAVEL INFORMATION',
      title: 'E-Visa Guide',
      introParagraph1:
        'If you are not a Vietnamese citizen, you may need to obtain a visa to enter Vietnam. The process is <strong><em>simple, affordable, and completed online.</em></strong>',
      applyLabel: 'Apply here:',
      btnPortal: 'E-Visa Portal',
      btnMoreInfo: 'Entry/Exit Info',
      keyDetails: {
        title: 'Key Details',
        items: [
          { value: '90', label: 'DAYS', description: 'Max. Validity (Single/Multiple)' },
          { value: '$25', label: 'FEE', description: '/ $50 (Multiple) — Non-refundable' },
          { value: '~5', label: 'BUSINESS DAYS', description: 'Apply 1-2 weeks early for peace of mind' },
        ],
      },
      whatYouNeed: {
        title: 'What You’ll Need',
        items: [
          'Passport valid for 6+ months with at least one blank page',
          'Scanned passport bio page',
          'Passport photo (4×6 cm, white background, no glasses)',
          'Credit/debit card for payment',
        ],
      },
      afterApproval: {
        title: 'After Approval',
        items: [
          'Download and print at least 2 copies of your e-visa',
          'Present your e-visa + passport at immigration upon arrival',
        ],
      },
      arrivalTips: {
        title: 'Arrival Tips',
        items: [
          'Tan Son Nhat (SGN) is the airport for Ho Chi Minh City — about 30 minutes from the venue',
          'Keep both digital and printed copies of your visa handy',
        ],
      },
    },
    travel: {
      subtitle: 'TRAVEL GUIDE',
      title: 'Ho Chi Minh',
      body: 'Ho Chi Minh City. Ten million people, a river, and <strong><em>the best iced coffee on Earth</em></strong> on every corner.',
      placesTitle: 'While you are here',
      places: [
        {
          name: 'Nguyen Hue Walking Street',
          desc: 'A wide pedestrian boulevard running from the old City Hall to the river. Busiest and best after dark.',
        },
        {
          name: 'Dong Khoi Street',
          desc: 'The old rue Catinat. Opera House, Notre-Dame, the Central Post Office and the Reverie all sit on or beside it — you can walk the lot in an afternoon.',
        },
        {
          name: 'Ben Thanh Market',
          desc: 'Fabric, coffee beans, dried mango, lacquerware. Haggle cheerfully, then eat at the food stalls out back.',
        },
        {
          name: 'The Cafe Apartments, 42 Nguyen Hue',
          desc: 'A 1960s block where every flat is now a tiny cafe or boutique. Take the lift up, walk the balconies down.',
        },
        {
          name: 'War Remnants Museum',
          desc: 'Heavy, honest and essential if you want to understand the city you are standing in.',
        },
        {
          name: 'Binh Tay Market & Cho Lon',
          desc: "Ho Chi Minh's Chinatown, 20 minutes west. Temples thick with incense coils and the best com tam in town.",
        },
      ],
      stay: {
        title: 'Where to stay',
        lead: 'The Reverie Saigon — our wedding venue — is offering a special accommodation rate for wedding guests.',
        rate: 'Deluxe rooms start from 4,400,000 VND per night (~ $170 USD) for 2 guests, including breakfast.',
        booking: 'Please contact the bride and groom for the booking link.',
        areaTitle: 'If you would rather stay elsewhere',
        areaLead: 'We recommend staying in District 1. Look for hotels along:',
        areas: ['Dong Khoi Street', 'Nguyen Hue Walking Street', 'Ben Nghe Ward'],
      },
    },
    rsvp: {
      subtitle: 'RSVP',
      title: 'Will You Join Us?',
      description: "We can't wait to celebrate with you. Leave your details below and we'll do the rest.",
      nameLabel: 'Name',
      namePlaceholder: 'e.g. John Smith',
      attendingLabel: 'Can you make it?',
      attendingYes: "Yes, I'll be there!",
      attendingNo: "No, can't make it ˙◠˙",
      guestsLabel: 'How many of you?',
      guestsPlaceholder: 'e.g. 2',
      mealLabel: 'Dietary restrictions (optional)',
      mealPlaceholder: 'e.g. Vegetarian, food allergies...',
      wishesLabel: 'Leave us a note',
      wishesPlaceholder: 'A wish, a memory, anything...',
      submitBtn: 'Send it in',
      successMsg: "Thank you — we've got it. We can't wait to celebrate with you 💛",
      note: 'Kindly reply before 20 November 2026.',
    },
    thankYou: {
      title: 'Thank You',
      body: "For being part of our story. We can't wait to see you in Ho Chi Minh.",
    },
    eventDetails: {
      venueLabel: 'The Venue',
      venueLines: ['The', 'Reverie', 'Saigon'],
      venueAddress: 'La Scala Ballroom, Floor 5 · 57-69F Đồng Khởi, Bến Nghé Ward, Ho Chi Minh City',
      mapsBtn: 'Open in Google Maps',
      guestCountLabel: 'Guests',
      guestCount: '180',
      schedule: 'Schedule',
      dresscode: 'Dresscode',
      agenda: [
        {
          title: 'The Rite',
          venue: 'Sunday, 20 December · 284/8 Nguyễn Trọng Tuyến, Phú Nhuận',
          items: [
            {
              time: '09:00',
              moment: 'vows',
              title: 'Lễ Vu Quy',
              description: "The wedding rite at the bride's family home",
            },
            {
              time: '10:00',
              moment: 'teaceremony',
              title: 'Tea Ceremony',
              description: 'Tea and gifts exchanged between the two families',
            },
            {
              time: '10:30',
              moment: 'photos',
              title: 'Photos',
              description: 'Pictures with family and all of you',
            },
          ],
        },
        {
          title: 'The Reception',
          venue: 'Sunday, 20 December · La Scala Ballroom, The Reverie Saigon',
          items: [
            {
              time: '18:00',
              moment: 'welcome',
              title: 'Welcome',
              description: 'Doors open — photos in the ballroom foyer',
            },
            {
              time: '19:00',
              moment: 'ceremony',
              title: 'Ceremony',
              description: 'Cake cutting and the champagne tower',
            },
            { time: '19:30', moment: 'dinner', title: 'Dinner', description: 'Dinner is served' },
            {
              time: '21:00',
              end: 'late',
              moment: 'party',
              title: 'After Party',
              description: 'Music, games and dancing',
            },
          ],
        },
      ],
      dresscodeNote:
        'We would love to see you in soft blues, sky and ivory, with a touch of gold — whatever makes you feel your best.',
    },
  },
  vi: {
    entrance: {
      hint: 'Cùng phác hoạ với chúng mình',
      whisper: 'hãy vẽ tự do trên màn hình',
    },
    hero: {
      eyebrow: 'lưu lại ngày',
      dateLine: 'Chủ nhật, 20 tháng 12 năm 2026',
      location: 'Hồ Chí Minh, Việt Nam',
      month: 'tháng 12',
    },
    nav: {
      venue: 'Địa điểm',
      schedule: 'Lịch trình',
      dresscode: 'Trang phục',
      visa: 'Visa',
      travel: 'Du lịch',
      rsvp: 'Xác nhận',
    },
    gallery: {
      subtitle: 'KHOẢNH KHẮC CỦA CHÚNG MÌNH',
      title: 'Album Của Chúng Mình',
      hint: 'lướt ngang để xem',
    },
    families: {
      subtitle: 'TRÂN TRỌNG BÁO TIN',
      title: 'Hai Gia Đình',
      intro:
        'Hai gia đình, một từ Đài Bắc và một từ Hồ Chí Minh, hân hạnh được đón tiếp bạn trong ngày vui của quý nam và quý nữ.',
      groom: {
        side: 'Nhà Trai',
        father: 'Ông Liao Ming-Chang',
        mother: 'Bà Sue Wen-Ling',
        address: 'Đài Bắc, Đài Loan',
        childLabel: 'Chú Rể',
        childName: 'Liao Ying-Chuan',
        rank: 'Quý Nam (con trai duy nhất)',
        rite: 'Lễ Thành Hôn',
        riteNote: 'Hôn lễ được cử hành bên nhà trai',
      },
      bride: {
        side: 'Nhà Gái',
        father: 'Ông Nguyễn Đăng Phong',
        mother: 'Bà Trần Thị Phương Anh',
        address: '284/8 Nguyễn Trọng Tuyến, Phú Nhuận, TP. Hồ Chí Minh',
        childLabel: 'Cô Dâu',
        childName: 'Nguyễn Trần Minh Anh',
        rank: 'Quý Nữ (con gái duy nhất)',
        rite: 'Lễ Vu Quy',
        riteNote: 'Cử hành tại tư gia nhà gái, 9:00 ngày 20/12/2026',
      },
    },
    visa: {
      subtitle: 'THÔNG TIN DU LỊCH',
      title: 'Hướng dẫn E-Visa',
      introParagraph1:
        'Nếu bạn không phải là công dân Việt Nam, bạn có thể cần có visa để nhập cảnh vào Việt Nam. Quy trình xin visa <strong><em>rất đơn giản, chi phí hợp lý và được thực hiện hoàn toàn trực tuyến.</em></strong>',
      applyLabel: 'Đăng ký tại đây:',
      btnPortal: 'Cổng E-Visa',
      btnMoreInfo: 'Xuất/Nhập cảnh',
      keyDetails: {
        title: 'Thông tin chính',
        items: [
          { value: '90', label: 'NGÀY', description: 'Thời hạn tối đa (Một/Nhiều lần)' },
          { value: '$25', label: 'PHÍ', description: '/ $50 (Nhiều lần) — Không hoàn lại' },
          { value: '~5', label: 'NGÀY LÀM VIỆC', description: 'Nên nộp trước 1-2 tuần cho an tâm' },
        ],
      },
      whatYouNeed: {
        title: 'Bạn cần chuẩn bị',
        items: [
          'Hộ chiếu còn hạn trên 6 tháng và còn ít nhất một trang trống',
          'Bản scan trang thông tin cá nhân của hộ chiếu',
          'Ảnh thẻ (4×6 cm, nền trắng, không đeo kính)',
          'Thẻ tín dụng/ghi nợ để thanh toán',
        ],
      },
      afterApproval: {
        title: 'Sau khi được duyệt',
        items: [
          'Tải xuống và in ít nhất 2 bản sao e-visa của bạn',
          'Xuất trình e-visa + hộ chiếu tại quầy nhập cảnh khi đến nơi',
        ],
      },
      arrivalTips: {
        title: 'Lưu ý khi đến',
        items: [
          'Sân bay Tân Sơn Nhất (SGN) cách địa điểm tiệc khoảng 30 phút',
          'Luôn mang theo cả bản kỹ thuật số và bản in của visa',
        ],
      },
    },
    travel: {
      subtitle: 'HƯỚNG DẪN DU LỊCH',
      title: 'Hồ Chí Minh',
      body: 'Thành phố Hồ Chí Minh. Mười triệu người, một dòng sông, và <strong><em>ly cà phê sữa đá ngon nhất hành tinh</em></strong> ở mọi góc phố.',
      placesTitle: 'Ghé thăm khi bạn đến',
      places: [
        {
          name: 'Phố đi bộ Nguyễn Huệ',
          desc: 'Đại lộ đi bộ chạy từ trụ sở UBND Thành phố ra tới bờ sông. Đông vui và đẹp nhất là sau khi trời tối.',
        },
        {
          name: 'Đường Đồng Khởi',
          desc: 'Con đường Catinat ngày xưa. Nhà hát Thành phố, Nhà thờ Đức Bà, Bưu điện Trung tâm và cả The Reverie đều nằm quanh đây — đi bộ một buổi chiều là hết.',
        },
        {
          name: 'Chợ Bến Thành',
          desc: 'Vải vóc, cà phê hạt, xoài sấy, đồ sơn mài. Trả giá vui vẻ, rồi ra khu hàng ăn phía sau.',
        },
        {
          name: 'Chung cư cà phê 42 Nguyễn Huệ',
          desc: 'Toà chung cư thập niên 60 nay mỗi căn hộ là một quán cà phê hay cửa hiệu nhỏ. Đi thang máy lên, rồi thong thả đi bộ xuống.',
        },
        {
          name: 'Bảo tàng Chứng tích Chiến tranh',
          desc: 'Nặng lòng, chân thật, và rất nên ghé nếu bạn muốn hiểu thành phố này.',
        },
        {
          name: 'Chợ Bình Tây & Chợ Lớn',
          desc: 'Khu người Hoa, cách trung tâm 20 phút. Những ngôi chùa nghi ngút khói nhang và cơm tấm ngon nhất thành phố.',
        },
      ],
      stay: {
        title: 'Nơi lưu trú',
        lead: 'The Reverie Saigon — nơi tổ chức tiệc cưới — có mức giá phòng ưu đãi dành riêng cho khách mời.',
        rate: 'Phòng Deluxe từ 4.400.000 VND/đêm (~170 USD) cho 2 khách, đã bao gồm bữa sáng.',
        booking: 'Bạn vui lòng liên hệ cô dâu chú rể để nhận link đặt phòng nhé.',
        areaTitle: 'Nếu bạn muốn ở nơi khác',
        areaLead: 'Chúng mình gợi ý bạn ở Quận 1, tìm khách sạn quanh:',
        areas: ['Đường Đồng Khởi', 'Phố đi bộ Nguyễn Huệ', 'Phường Bến Nghé'],
      },
    },
    rsvp: {
      subtitle: 'XÁC NHẬN THAM DỰ',
      title: 'Bạn sẽ tham dự chứ?',
      description: 'Chúng mình rất mong được chung vui cùng bạn. Bạn để lại vài thông tin bên dưới nhé.',
      nameLabel: 'Tên của bạn',
      namePlaceholder: 'VD: Nguyễn Văn A',
      attendingLabel: 'Bạn tới chung vui được chứ?',
      attendingYes: 'Có chứ, mình sẽ tới!',
      attendingNo: 'Tiếc quá, mình không tới được ˙◠˙',
      guestsLabel: 'Bạn đi mấy người?',
      guestsPlaceholder: 'VD: 2',
      mealLabel: 'Lưu ý về ăn uống (nếu có)',
      mealPlaceholder: 'VD: Ăn chay, dị ứng hải sản...',
      wishesLabel: 'Để lại đôi lời nhé',
      wishesPlaceholder: 'Một lời chúc, một kỷ niệm, gì cũng được...',
      submitBtn: 'Gửi nhé',
      successMsg: 'Cảm ơn bạn — chúng mình đã nhận được rồi. Hẹn gặp bạn nhé 💛',
      note: 'Bạn vui lòng phản hồi trước ngày 20/11/2026.',
    },
    thankYou: {
      title: 'Cảm Ơn Bạn',
      body: 'Vì đã là một phần trong câu chuyện của chúng mình. Hẹn gặp bạn ở Hồ Chí Minh.',
    },
    eventDetails: {
      venueLabel: 'Địa điểm',
      venueLines: ['The', 'Reverie', 'Saigon'],
      venueAddress: 'La Scala Ballroom, Tầng 5 · 57-69F Đồng Khởi, Phường Bến Nghé, TP. Hồ Chí Minh',
      mapsBtn: 'Xem trên Google Maps',
      guestCountLabel: 'Số lượng khách',
      guestCount: '180',
      schedule: 'Lịch trình',
      dresscode: 'Trang phục',
      agenda: [
        {
          title: 'Hôn Lễ',
          venue: 'Chủ nhật, 20/12 · 284/8 Nguyễn Trọng Tuyến, Phú Nhuận',
          items: [
            {
              time: '09:00',
              moment: 'vows',
              title: 'Lễ Vu Quy',
              description: 'Hôn lễ được cử hành tại tư gia nhà gái',
            },
            {
              time: '10:00',
              moment: 'teaceremony',
              title: 'Trao quà',
              description: 'Hai gia đình dâng trà và trao lễ',
            },
            {
              time: '10:30',
              moment: 'photos',
              title: 'Chụp ảnh',
              description: 'Chụp hình cùng gia đình và khách mời',
            },
          ],
        },
        {
          title: 'Tiệc Mừng',
          venue: 'Chủ nhật, 20/12 · La Scala Ballroom, The Reverie Saigon',
          items: [
            {
              time: '18:00',
              moment: 'welcome',
              title: 'Đón khách',
              description: 'Mở cửa đón khách và chụp ảnh tại sảnh tiệc',
            },
            {
              time: '19:00',
              moment: 'ceremony',
              title: 'Nhập tiệc',
              description: 'Nghi thức cắt bánh và rót tháp ly',
            },
            { time: '19:30', moment: 'dinner', title: 'Tiệc tối', description: 'Cùng dùng bữa tối' },
            {
              time: '21:00',
              end: 'khuya',
              moment: 'party',
              title: 'After Party',
              description: 'Âm nhạc, gameshow và khiêu vũ',
            },
          ],
        },
      ],
      dresscodeNote:
        'Chúng mình rất vui nếu bạn chọn trang phục tông xanh nhạt, xanh trời và trắng ngà, điểm chút ánh vàng — miễn là bạn thấy thoải mái và tự tin nhất.',
    },
  },
};

export const FLASHBACK_IMAGES = [
  '/images/moment-01.webp',
  '/images/moment-02.webp',
  '/images/moment-03.webp',
  '/images/moment-04.webp',
  '/images/moment-05.webp',
  '/images/moment-06.webp',
  '/images/moment-07.webp',
] as const;
