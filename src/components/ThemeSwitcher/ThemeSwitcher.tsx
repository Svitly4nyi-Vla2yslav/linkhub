import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firabase';
import styled, { keyframes } from 'styled-components';
import { ThemeData } from '../ContainerWidget/HomeDefaultDarkTheme';
import { DEFAULT_THEME } from '../Thema/theme';

const ThemeSwitcherContainer = styled.div`
  width: 420px;
  margin: 0 auto;
  padding: 0 16px;
  margin-bottom: 24px;
`;

const ThemeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ThemeTitle = styled.span`
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 500;
`;

const ThemeItem = styled.div<{ $isActive: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  border: ${({ $isActive }) =>
    $isActive ? '2px solid #4E7FDF' : '1px solid rgba(255, 255, 255, 0.2)'};
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 0 0 2px rgba(78, 127, 223, 0.3)' : 'none'};

  &:hover {
    transform: scale(1.02);
  }
`;

const ThemeItemContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 6px;
`;

const ThemePreview = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  margin-top: 16px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

type ExtendedCSS = React.CSSProperties & {
  [key: string]: any; // <- дозволяє будь-які псевдоселектори та custom властивості
};

// Локальні теми
const LOCAL_THEMES: Record<string, ThemeData> = {
  default_theme: DEFAULT_THEME,
  light_theme: {
    isDefault: false,
    styles: {
      MainContainer: {
          display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "32px",
      background: "#090909",
      minHeight: "100vh",
      width: "393px",
      margin: "0 auto",
      position: "relative",
      overflowX: "hidden",
      scrollbarWidth: "none",
      maxWidth: "393px"},
      ProfileSection: { background: '#F5F5F5' },
      PersonalBanner: {
        background: 'linear-gradient(180deg, #4E7FDF, #62DF4E)',
      },
      ProfileCover: {},
      ProfileCard: {},
      ProfileInfo: {},
      ProfileName: {},
      ProfileDescription: {},
      ProfileAvatar: {},
      ProfileLinks: {},
      ProfileLink: {},
      ProfileLinkIcon: {},
      ProfileLinkText: {},
      ProfileLinkArrow: {},
      ProfileLinkDivider: {},
      ProfileLinkContainer: {},
      ProfileLinkContent: {},
      ProfileLinkBadge: {},
      ProfileLinkBadgeText: {},
      ProfileLinkBadgeIcon: {},
      ProfileLinkBadgeContainer: {},
      ProfileLinkBadgeContent: {},
      BannerContainer1: {},
      BannerContainer2: {},
      BannerContainer3: {},
      BannerContainer4: {},
      BannerContainer5: {},
      BannerContainer6: {},
      BannerContainer7: {},
      BannerContainer8: {},
      BannerContainer9: {},
      BannerContainer10: {},
      BannerContainer11: {},
      BannerContainer12: {},
      BannerContainer13: {},
      BannerContainer14: {},
      BannerContainer15: {},
      BannerContainer16: {},
      BannerContainer17: {},
      BannerContainer18: {},
      BannerContainer19: {},
      BannerContainer20: {},
      NamePart: {},
      ProfileTitle: {},
      ActionButtons: {},
      ActionButton: {},
      VideoSection: {},
      ArtItem: {},
      ArtTitle: {},
      ArtPrice: {},
      SocialLinks: {},
      SocialLink: {},
      SocialIcon: {},
      SocialText: {},
      SocialArrow: {},
      Footer: {},
      FooterText: {},
      FooterTextPart: {},
      PlayButton: {},
      Container: {},
      VideoContainer: {},
      BannerTitle: {},
      BannerName: {},
      BannerContainer: {},
      FreeEntrance: {},
      BannerLocation: {},
      BannerItem: {},
      DataContainer: {},
    },
  },
  blue_theme: {
    isDefault: false,
    styles: {
      MainContainer: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          background: "rgb(122 93 165)",
          minHeight: "100vh",
          width: "393px",
          margin: "0 auto",
          position: "relative",
          overflowX: "hidden",
          scrollbarWidth: "none",
          maxWidth: "393px",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        } as ExtendedCSS,
        ProfileSection: {
          width: "100%",
          maxWidth: "393px",
          position: "relative",
          marginBottom: "180px"
        },
        ProfileCover: {
          position: "relative",
          width: "100%",
          height: "280px",
          borderRadius: "0 0 24px 24px"
        },
        CoverImage: {
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover"
        },
    
        ProfileCard: {
          position: "absolute",
          top: "127px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "345px",
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(31,31,31,0.7) 100%)",
          border: "none",
          borderRadius: "48px",
          backdropFilter: "blur(10px)",
          margin: "0 auto"
        },
    
        ProfileInfo: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        },
    
    
        ProfileImage: {
          borderRadius: "40px",
          width: "100px",
          height: "100px",
          objectFit: "cover"
        },
        ProfileName: {
          display: "flex",
          gap: "12px",
          fontFamily: "'Abhaya Libre', sans-serif"
        },
    
        NamePart: {
          color: "#FFF",
          fontSize: "36px",
          fontWeight: "700",
          lineHeight: "1.2"
        },
    
        ProfileTitle: {
          color: "rgba(255,255,255,0.7)",
          fontFamily: "'Abhaya Libre', sans-serif",
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "1.2"
        },
    
        ActionButtons: {
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
        },
        ActionButton: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          height: "48px",
          padding: "8px 16px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontFamily: "'Abhaya Libre', sans-serif",
          fontSize: "20px",
          fontWeight: "400",
          lineHeight: "1.2",
          color: "#FFF",
        },
        ActionButtonCall: {
          background: "linear-gradient(100deg, #62DF4E 0%, #35792A 96.03%)"
        },
        ActionButtonMail: {
          background: "linear-gradient(100deg, #4E7FDF 0%, #5864A3 96.03%)"
        },
    
        VideoSection: {
          position: "relative",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "345px",
          height: "194px",
          overflow: "hidden",
          background: "#000",
          marginTop: "32px"
        },
    
        SwiperStyle: {
          width: "100%",
          height: "100%"
        },
    
        SwiperSlideStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
    
        VideoContainer: {
          position: "relative",
          width: "100%",
          height: "100%"
        },
    
        Video: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: "pointer"
        },
    
        PlayButton: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          borderRadius: "24px",
          width: "56px",
          height: "56px",
          backdropFilter: "blur(6px)",
          background: "rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "10",
          transition: "all 0.3s ease"
        },
    
        Container: {
          width: "100%",
          maxWidth: "393px"
        },
    
        ArtItem: {
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          '&:hover': {
            background: "rgba(39, 38, 40, 0.9)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            '&::before': {
              content: "''",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
              animation: "shine 1.5s infinite"
            }
          } as ExtendedCSS,
          '&:active': {
            transform: "translateY(0)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }
        },
        keyframes: {
          shine: keyframes`
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        `
        } as ExtendedCSS,
        ArtImage: {
          borderRadius: "26.667px",
          width: "160px",
          height: "160px",
          objectFit: "cover"
        },
        ArtTitle: {
          color: "#FFF",
          fontFamily: "'Abhaya Libre', sans-serif",
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "1.2",
          padding: "0 0 8px 8px"
        },
        ArtPrice: {
          color: "#FFF",
          fontFamily: "'Abhaya Libre', sans-serif",
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "1.2",
          padding: "0 0 8px 8px"
        },
        SocialLinks: {
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        },
        SocialLink: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 32px 12px 16px",
          maxWidth: "345px",
          height: "64px",
          border: "1px solid #656565",
          background: "rgba(39, 38, 40, 0.7)",
          borderRadius: "16px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          gap: "10px",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          '&:hover': {
            background: "rgba(39, 38, 40, 0.9)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            '&::before': {
              content: "''",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
              animation: "shine 1.5s infinite"
            }
          } as ExtendedCSS,
          '&:active': {
            transform: "translateY(0)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }
        },
        SocialIcon: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateX(4px)"
          }
        } as ExtendedCSS,
        SocialText: {
          color: "#979797",
          fontFamily: "'Abhaya Libre', sans-serif",
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "1.2",
          transition: "color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            color: "#FFF",
            transform: "scale(1.02)"
          }
        } as ExtendedCSS,
        SocialArrow: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "32px",
          width: "48px",
          height: "32px",
          background: "rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.2)",
            transform: "translateX(4px)",
            svg: {
              transform: "translateX(2px)"
            }
          },
          svg: {
            transition: "transform 0.3s ease"
          }
        } as ExtendedCSS,
        PersonalBanner: {
          // zIndex: "10",
          position: "relative",
          display: "flex",
          borderRadius: "20px",
          padding: "16px",
          width: "345px",
          height: "192px",
          // background: "linear-gradient(318deg, rgba(255, 0, 0, 0.85) 0%, rgba(255, 0, 98, 0) 100%)",
          backdropFilter: "blur(50px)",
          boxShadow: "inset 0 1px 0 0 #fff",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "baseline",
          overflow: "hidden",
          after_content: "",
          after_position: "absolute",
          after_top: "0",
          after_right: "0",
          after_width: "50%",
          after_height: "100%",
          after_background: "linear-gradient(318deg, rgba(255, 0, 0, 0.85) 0%, rgba(255, 0, 98, 0) 100%)",
          after_filter: "blur(20px)",
          after_zIndex: "0"
        } as ExtendedCSS,
        BannerContainer: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          width: "100%",
          zIndex: "1"
        },
        BannerContainer1: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          width: "100%",
          zIndex: "1"
        },
        BannerItem: {
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          flexWrap: "wrap",
          justifyContent: "space-between",
          zIndex: "1"
        },
        DataContainer: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          zIndex: "1",
          p: {
            fontFamily: "var(--font7)",
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0.01em",
            textAlign: "center",
            color: "#000"
          },
          span: {
            fontFamily: "var(--font7)",
            fontWeight: "400",
            fontSize: "11px",
            lineHeight: "100%",
            letterSpacing: "0.01em",
            textAlign: "center",
            color: "#000"
          }
        } as ExtendedCSS,
        FreeEntrance: {
          fontFamily: "var(--font7)",
          fontWeight: "500",
          fontSize: "11px",
          lineHeight: "100%",
          letterSpacing: "0.01em",
          color: "#000"
        },
        BannerLocation: {
          fontFamily: "var(--font7)",
          fontWeight: "700",
          fontSize: "13px",
          lineHeight: "100%",
          letterSpacing: "0.01em",
          color: "#000"
        },
        BannerTitle: {
          fontFamily: "var(--font16)",
          fontWeight: "400",
          fontSize: "32px",
          lineHeight: "100%",
          letterSpacing: "0.01em",
          color: "#000"
        },
        BannerName: {
          fontFamily: "var(--font7)",
          fontWeight: "400",
          fontSize: "20px",
          lineHeight: "100%",
          letterSpacing: "0.01em",
          color: "#000"
        },
        Footer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "51px",
          background: "#1E1E1F"
        },
        FooterText: {
          display: "flex",
          gap: "8px"
        },
        FooterTextPart: {
          color: "#FFF",
          fontFamily: "'Abhaya Libre', sans-serif",
          fontSize: "14px",
          lineHeight: "1.2",
          lastChild: {
            fontWeight: "700"
          }
        } as ExtendedCSS
      }
  },
  purple_theme: {
    isDefault: false,
    styles: {
      MainContainer: { background: '#1E0F33' },
      ProfileSection: { background: '#2A1B47' },
      PersonalBanner: {
        background: 'linear-gradient(180deg, #9C27B0, #673AB7)',
      },
      ProfileCover: {},
      ProfileCard: {},
      ProfileInfo: {},
      ProfileName: {},
      ProfileDescription: {},
      ProfileAvatar: {},
      ProfileLinks: {},
      ProfileLink: {},
      ProfileLinkIcon: {},
      ProfileLinkText: {},
      ProfileLinkArrow: {},
      ProfileLinkDivider: {},
      ProfileLinkContainer: {},
      ProfileLinkContent: {},
      ProfileLinkBadge: {},
      ProfileLinkBadgeText: {},
      ProfileLinkBadgeIcon: {},
      ProfileLinkBadgeContainer: {},
      ProfileLinkBadgeContent: {},
      BannerContainer1: {},
      BannerContainer2: {},
      BannerContainer3: {},
      BannerContainer4: {},
      BannerContainer5: {},
      BannerContainer6: {},
      BannerContainer7: {},
      BannerContainer8: {},
      BannerContainer9: {},
      BannerContainer10: {},
      BannerContainer11: {},
      BannerContainer12: {},
      BannerContainer13: {},
      BannerContainer14: {},
      BannerContainer15: {},
      BannerContainer16: {},
      BannerContainer17: {},
      BannerContainer18: {},
      BannerContainer19: {},
      BannerContainer20: {},
      NamePart: {},
      ProfileTitle: {},
      ActionButtons: {},
      ActionButton: {},
      VideoSection: {},
      ArtItem: {},
      ArtTitle: {},
      ArtPrice: {},
      SocialLinks: {},
      SocialLink: {},
      SocialIcon: {},
      SocialText: {},
      SocialArrow: {},
      Footer: {},
      FooterText: {},
      FooterTextPart: {},
      PlayButton: {},
      Container: {},
      VideoContainer: {},
      BannerTitle: {},
      BannerName: {},
      BannerContainer: {},
      FreeEntrance: {},
      BannerLocation: {},
      BannerItem: {},
      DataContainer: {},
    },
  },
};

interface ThemeSwitcherProps {
  onThemeChange: (theme: ThemeData) => void;
  currentTheme: ThemeData;
}

export const ThemeSwitcher = ({
  onThemeChange,
  currentTheme,
}: ThemeSwitcherProps) => {
  const [themes, setThemes] = useState<Record<string, ThemeData>>(LOCAL_THEMES);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Додаємо дефолтну тему, якщо її немає
    if (!themes.default_theme) {
      setThemes(prev => ({ default_theme: DEFAULT_THEME, ...prev }));
    }

    // Знаходимо індекс активної теми
    const themeEntries = Object.entries(themes);
    const foundIndex = themeEntries.findIndex(
      ([_, theme]) =>
        JSON.stringify(theme.styles) === JSON.stringify(currentTheme.styles)
    );

    setActiveIndex(foundIndex >= 0 ? foundIndex : 0);
  }, [currentTheme, themes]);

  const handleThemeSelect = (
    themeName: string,
    themeData: ThemeData,
    index: number
  ) => {
    setActiveIndex(index);
    onThemeChange({
      isDefault: themeData.isDefault,
      styles: themeData.styles,
    });
  };

  return (
    <ThemeSwitcherContainer>
      <ThemeHeader>
        <ThemeTitle>Theme</ThemeTitle>
      </ThemeHeader>

      <Swiper
        modules={[FreeMode]}
        spaceBetween={8}
        slidesPerView="auto"
        freeMode={true}
        initialSlide={activeIndex}
      >
        {Object.entries(themes).map(([themeName, themeData], index) => (
          <SwiperSlide key={themeName} style={{ width: 'auto' }}>
            <ThemeItem
              $isActive={index === activeIndex}
              style={{ background: themeData.styles.MainContainer?.background }}
              onClick={() => handleThemeSelect(themeName, themeData, index)}
            >
              <ThemeItemContent
                style={{
                  background: themeData.styles.PersonalBanner?.background,
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}
                />
              </ThemeItemContent>
            </ThemeItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </ThemeSwitcherContainer>
  );
};
