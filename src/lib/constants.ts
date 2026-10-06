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
  // The Reverie's booking engine, pre-loaded with the wedding promo code
  stayBookingUrl:
    'https://be.synxis.com/?adult=1&arrive=2026-02-05&chain=24447&child=0&currency=VND&depart=2026-02-06&hotel=7060&level=hotel&locale=en-US&productcurrency=VND&promo=TRSWEDDINGSP&rooms=1',
  fastTrackUrl:
    'https://www.klook.com/en-CA/activity/227975-open-date-vip-fast-track-service-for-immigration-at-ho-chi-minh-city/',
} as const;

// Two city guides the couple likes, hung off the Ho Chi Minh City pin on the
// map. Titles stay in the video's own language — they are what YouTube prints.
export const HCMC_VIDEOS = [
  {
    id: 'PYNRmHRVxDE',
    url: 'https://youtu.be/PYNRmHRVxDE',
    title: 'Ho Chi Minh City Diaries: Where to Eat and Shop',
    author: 'Christine Le',
  },
  {
    id: 'WisjwmQHPRQ',
    url: 'https://youtu.be/WisjwmQHPRQ',
    title: 'Ho Chi Minh City in 4 Days (for cafés, food & vintage architecture)',
    author: 'Mei Time',
  },
] as const;

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
    entrance: { hint: string; whisper: string; angels: string };
    hero: { eyebrow: string; dateLine: string; location: string; month: string };
    nav: {
      venue: string;
      schedule: string;
      dresscode: string;
      visa: string;
      stay: string;
      food: string;
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
      fastTrack: { title: string; body: string; note: string; btn: string };
    };
    vietnam: {
      subtitle: string;
      title: string;
      body: string;
      hint: string;
      focusHint: string;
      watchLabel: string;
      closeLabel: string;
      // `pin` is the short form written beside the bead on the map, where a
      // full city name would run across the drawing
      places: {
        hanoi: { name: string; pin: string; role: string; note: string };
        hcmc: { name: string; pin: string; role: string; note: string };
      };
    };
    stay: {
      subtitle: string;
      title: string;
      lead: string;
      rate: string;
      booking: string;
      bookBtn: string;
      areaTitle: string;
      areaLead: string;
      areas: string[];
    };
    food: {
      subtitle: string;
      title: string;
      body: string;
      guideTitle: string;
      guideLead: string;
      steps: string[];
      listsTitle: string;
      lists: { name: string; desc: string; url: string }[];
      outro: string;
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
      companionsLabel: string;
      companionsHint: string;
      companionsPlaceholder: string;
      mealLabel: string;
      mealYes: string;
      mealNo: string;
      wishesLabel: string;
      wishesPlaceholder: string;
      submitBtn: string;
      successMsg: string;
      note: string;
    };
    thankYou: { title: string; body: string[] };
    eventDetails: {
      venueSubLabel: string;
      venueLabel: string;
      venueLines: string[];
      venueAddress: string;
      mapsBtn: string;
      guestCountLabel: string;
      guestCount: string;
      scheduleSubLabel: string;
      schedule: string;
      dresscodeSubLabel: string;
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
      angels: 'The angels are sending our love to you.',
    },
    hero: {
      eyebrow: 'save the date',
      dateLine: 'Sunday, 20 December 2026',
      location: 'Ho Chi Minh City, Vietnam',
      month: 'december',
    },
    nav: {
      venue: 'Venue',
      schedule: 'Schedule',
      dresscode: 'Dresscode',
      visa: 'Visa',
      stay: 'Stay',
      food: 'Food',
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
      fastTrack: {
        title: 'Fast Track',
        body: 'Immigration at Tan Son Nhat can be slow after a long flight. A VIP fast-track service walks you through the queue — worth it if you land in the evening.',
        note: 'When booking, please select “Non-Vietnamese”.',
        btn: 'Book Fast Track',
      },
    },
    vietnam: {
      subtitle: 'WELCOME TO',
      title: 'Vietnam',
      body: 'A long, narrow country with a capital at one end and our wedding at the other. Here is where the two sit.',
      hint: 'Tap a light on the map',
      focusHint: 'Two cities are lit on the map. Tap either one to read about it.',
      watchLabel: 'While you are in the city',
      closeLabel: 'Close',
      places: {
        hanoi: {
          name: 'Hanoi',
          pin: 'Hanoi',
          role: 'The capital',
          note: 'Up north, two hours by plane. Old quarter streets, lakes and the best cold weather the country has — worth a few days if you have them.',
        },
        hcmc: {
          name: 'Ho Chi Minh City',
          pin: 'Ho Chi Minh',
          role: 'Where we are getting married',
          note: 'The big, loud, friendly city of the south. Warm all year, awake all night, and the whole wedding happens within a few streets of District 1.',
        },
      },
    },
    stay: {
      subtitle: 'WHERE TO STAY',
      title: 'Accommodation',
      lead: 'The Reverie Saigon — our wedding venue — is offering a special accommodation rate for wedding guests.',
      rate: 'Deluxe rooms start from 4,400,000 VND per night (~ $170 USD) for 2 guests, including breakfast.',
      booking: 'The wedding rate is already applied in the link below.',
      bookBtn: 'Book Here',
      areaTitle: 'If you would rather stay elsewhere',
      areaLead: 'We recommend staying in District 1. Look for hotels along:',
      areas: ['Dong Khoi Street', 'Nguyen Hue Walking Street', 'Ben Nghe Ward'],
    },
    food: {
      subtitle: 'FOOD GUIDE',
      title: 'Where We Eat',
      body: 'Our favourite places to eat in Ho Chi Minh City. Go hungry.',
      guideTitle: 'How to save these lists',
      guideLead: 'Each link below opens a Google Maps list. Save it once and it stays on your phone for the whole trip.',
      steps: [
        'Open a list below and tap Save.',
        'In Google Maps, open the side menu and choose Saved.',
        'Scroll to the bottom — the lists you saved are waiting there.',
      ],
      listsTitle: 'The lists',
      lists: [
        {
          name: 'Local Food',
          desc: 'Where we actually eat — street stalls, rice plates and noodle shops.',
          url: 'https://maps.app.goo.gl/L2Tvz9MVYWjUurV77',
        },
        {
          name: 'Restaurants',
          desc: 'Sit-down places, tourist friendly and gentle on a delicate stomach.',
          url: 'https://maps.app.goo.gl/8CSZpCvtp8G8EWb59',
        },
        {
          name: 'Drinks',
          desc: 'Coffee, matcha and other interesting drinks.',
          url: 'https://maps.app.goo.gl/x4qzJWTjB7VsNEKn6',
        },
      ],
      outro: 'Hope you enjoy Vietnamese food the way we do ♥',
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
      guestsLabel: 'How many of you are coming?',
      guestsPlaceholder: 'e.g. 1, 2...',
      companionsLabel: 'Tell us who',
      companionsHint: "Tell us who's joining you (partner, family, friend...).",
      companionsPlaceholder: 'e.g. me and my partner',
      mealLabel: 'Vegetarian?',
      mealYes: 'Yes',
      mealNo: 'No',
      wishesLabel: 'Leave us a note',
      wishesPlaceholder: 'A wish, a memory, anything...',
      submitBtn: 'Send it in',
      successMsg: "Thank you — we've got it. We can't wait to celebrate with you 💛",
      note: 'Kindly reply before 20 November 2026.',
    },
    thankYou: {
      title: 'Thank You',
      body: ['For being part of our story.', "We can't wait to see you."],
    },
    eventDetails: {
      venueSubLabel: 'WHERE TO FIND US',
      venueLabel: 'The Venue',
      venueLines: ['The', 'Reverie', 'Saigon'],
      venueAddress: 'La Scala Ballroom, Floor 5 · 57-69F Đồng Khởi, Bến Nghé Ward, Ho Chi Minh City',
      mapsBtn: 'Open in Google Maps',
      guestCountLabel: 'Guests',
      guestCount: '180',
      scheduleSubLabel: 'THE RUN OF THE DAY',
      schedule: 'Schedule',
      dresscodeSubLabel: 'WHAT TO WEAR',
      dresscode: 'Dresscode',
      agenda: [
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
      dresscodeNote: 'A little color inspiration for the night. Wear what you love.',
    },
  },
  vi: {
    entrance: {
      hint: 'Cùng phác hoạ với chúng mình',
      whisper: 'hãy vẽ tự do trên màn hình',
      angels: 'Các thiên thần đang mang yêu thương của chúng mình đến bạn.',
    },
    hero: {
      eyebrow: 'lưu lại ngày',
      dateLine: 'Chủ nhật, 20 tháng 12 năm 2026',
      location: 'TP. Hồ Chí Minh, Việt Nam',
      month: 'tháng 12',
    },
    nav: {
      venue: 'Địa điểm',
      schedule: 'Lịch trình',
      dresscode: 'Trang phục',
      visa: 'Visa',
      stay: 'Lưu trú',
      food: 'Ăn uống',
      rsvp: 'Xác nhận',
    },
    gallery: {
      subtitle: 'KHOẢNH KHẮC CỦA CHÚNG MÌNH',
      title: 'Album ảnh',
      hint: 'lướt ngang nhé',
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
      fastTrack: {
        title: 'Fast Track',
        body: 'Thủ tục nhập cảnh ở Tân Sơn Nhất có thể khá lâu sau một chuyến bay dài. Dịch vụ Fast Track sẽ có người đón và đưa bạn qua cửa ưu tiên — rất đáng nếu bạn hạ cánh vào buổi tối.',
        note: 'Khi đặt, vui lòng chọn “Non-Vietnamese”.',
        btn: 'Đặt Fast Track',
      },
    },
    vietnam: {
      subtitle: 'CHÀO MỪNG ĐẾN',
      title: 'Việt Nam',
      body: 'Một dải đất dài, thủ đô ở đầu này và đám cưới của tụi mình ở đầu kia. Đây là vị trí của hai nơi đó.',
      hint: 'Bấm vào một điểm sáng trên bản đồ',
      focusHint: 'Hai thành phố đang sáng trên bản đồ. Bấm vào một điểm để xem nhé.',
      watchLabel: 'Đi chơi gì ở TP.HCM',
      closeLabel: 'Đóng',
      places: {
        hanoi: {
          name: 'Hà Nội',
          pin: 'Hà Nội',
          role: 'Thủ đô',
          note: 'Ở phía Bắc, bay chừng hai tiếng. Phố cổ, hồ và tiết trời mát nhất nước — rất đáng ở lại vài ngày nếu bạn có thời gian.',
        },
        hcmc: {
          name: 'Thành phố Hồ Chí Minh',
          pin: 'TP.HCM',
          role: 'Nơi tụi mình làm đám cưới',
          note: 'Thành phố lớn nhất miền Nam. Nắng quanh năm, thức cả đêm, và toàn bộ đám cưới nằm gọn trong vài con đường ở Quận 1.',
        },
      },
    },
    stay: {
      subtitle: 'CHỖ NGHỈ',
      title: 'Nơi lưu trú',
      lead: 'The Reverie Saigon — nơi tổ chức tiệc cưới — có mức giá phòng ưu đãi dành riêng cho khách mời.',
      rate: 'Phòng Deluxe từ 4.400.000 VND/đêm (~170 USD) cho 2 khách, đã bao gồm bữa sáng.',
      booking: 'Giá ưu đãi đã được áp sẵn trong link bên dưới.',
      bookBtn: 'Đặt phòng',
      areaTitle: 'Nếu bạn muốn ở nơi khác',
      areaLead: 'Chúng mình gợi ý bạn ở Quận 1, tìm khách sạn quanh:',
      areas: ['Đường Đồng Khởi', 'Phố đi bộ Nguyễn Huệ', 'Phường Bến Nghé'],
    },
    food: {
      subtitle: 'GỢI Ý ĂN UỐNG',
      title: 'Tụi mình hay ăn ở đây',
      body: 'Những chỗ ăn tụi mình thường ăn nhất ở TP.HCM. Nhớ đi lúc đói nha.',
      guideTitle: 'Cách lưu các list này',
      guideLead: 'Mỗi link bên dưới mở ra một list trên Google Maps. Lưu một lần là nó nằm sẵn trong máy bạn suốt chuyến đi.',
      steps: [
        'Mở một list bên dưới rồi bấm Save.',
        'Vào Google Maps, mở menu bên trái và chọn Saved.',
        'Kéo xuống cuối trang — list bạn vừa lưu nằm ở đó.',
      ],
      listsTitle: 'Ba list của tụi mình',
      lists: [
        {
          name: 'Quán ruột',
          desc: 'Chỗ tụi mình hay ăn thật — hàng quán vỉa hè, cơm tấm, bún, phở.',
          url: 'https://maps.app.goo.gl/L2Tvz9MVYWjUurV77',
        },
        {
          name: 'Nhà hàng',
          desc: 'Không gian thoải mái, phù hợp nếu bạn không quen đồ ăn lạ.',
          url: 'https://maps.app.goo.gl/8CSZpCvtp8G8EWb59',
        },
        {
          name: 'Đồ uống',
          desc: 'Cà phê, matcha và nhìu món đồ uống hay ho khác',
          url: 'https://maps.app.goo.gl/x4qzJWTjB7VsNEKn6',
        },
      ],
      outro: 'Rất mong bạn mê đồ ăn Việt giống như tụi mình nha ♥',
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
      guestsPlaceholder: 'VD: 1, 2...',
      companionsLabel: 'Bạn đi cùng ai?',
      companionsHint: 'Cho tụi mình biết bạn đi cùng ai nhé (người yêu, gia đình, bạn bè...).',
      companionsPlaceholder: 'VD: người yêu mình',
      mealLabel: 'Bạn ăn chay chứ?',
      mealYes: 'Có',
      mealNo: 'Không',
      wishesLabel: 'Để lại đôi lời nhé',
      wishesPlaceholder: 'Một lời chúc, một kỷ niệm, gì cũng được...',
      submitBtn: 'Gửi nhé',
      successMsg: 'Cảm ơn bạn — chúng mình đã nhận được rồi. Hẹn gặp bạn nhé 💛',
      note: 'Bạn vui lòng phản hồi trước ngày 20/11/2026.',
    },
    thankYou: {
      title: 'Cảm Ơn Bạn',
      body: ['Vì đã là một phần trong câu chuyện của chúng mình.', 'Hẹn gặp bạn nhé.'],
    },
    eventDetails: {
      venueSubLabel: 'ĐỊA ĐIỂM TỔ CHỨC',
      venueLabel: 'Địa điểm',
      venueLines: ['The', 'Reverie', 'Saigon'],
      venueAddress: 'La Scala Ballroom, Tầng 5 · 57-69F Đồng Khởi, Phường Bến Nghé, TP. Hồ Chí Minh',
      mapsBtn: 'Xem trên Google Maps',
      guestCountLabel: 'Số lượng khách',
      guestCount: '180',
      scheduleSubLabel: 'CHƯƠNG TRÌNH',
      schedule: 'Lịch trình',
      dresscodeSubLabel: 'GỢI Ý TRANG PHỤC',
      dresscode: 'Trang phục',
      agenda: [
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
      dresscodeNote: 'Gợi ý màu sắc cho buổi tiệc thêm xinh. Mặc món bạn thích nhất nhé.',
    },
  },
};

// The gallery strip: the ten photographs the couple picked, in their order
export const GALLERY_IMAGES = [
  '/images/gallery-01.webp',
  '/images/gallery-02.webp',
  '/images/gallery-03.webp',
  '/images/gallery-04.webp',
  '/images/gallery-05.webp',
  '/images/gallery-06.webp',
  '/images/gallery-07.webp',
  '/images/gallery-08.webp',
  '/images/gallery-09.webp',
  '/images/gallery-10.webp',
] as const;
