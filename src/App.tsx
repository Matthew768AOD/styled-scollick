import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { MovementButton } from "./components/MovementButton";
import { CloseButton } from "./components/CloseButton";
import { ToggleSwitch } from "./components/ToggleSwitch";
import { OptionButton } from "./components/OptionButton";
import { OptionGroup } from "./components/OptionGroup";
import { ImagePicker } from "./components/ImagePicker";
import { GlassContainer } from "./components/GlassContainer";
import { SettingsRow, SettingLabel } from "./components/Settings";
import { SettingsLang } from "./language_pack/settings"
import type { Lang } from "./language_pack/settings"

export default function App() {
  const [dark, setDark] = useState(true);
  const theme = dark ? darkTheme : lightTheme;
  const [on, setOn] = useState(false);
  const [choice, setChoice] = useState("beans");
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: string) => SettingsLang[lang][k] ?? k;

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: !dark ? `url("/clouds.jpg")` : 'url("/0Cat Planet.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: theme.colors.text,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <button onClick={() => setDark((v) => !v)}> Toggle {dark ? "Light" : "Dark"} </button>
      <div style={{ display: "flex", gap: 12 }}>
        <MovementButton direction="back" />
        <MovementButton direction="forward" />
        <CloseButton/>
        <ToggleSwitch checked={on} onChange={setOn} />
      </div>
      <OptionButton label="option1" size="sm" />
      <OptionButton label="option1" size="lg" />

      <OptionGroup
        size="lg"
        value={choice}
        onChange={setChoice}
        options={[
          { label: "beans", value: "beans" },
          { label: "balls", value: "balls" },
          { label: "ben",   value: "ben" },
        ]}
      />
      <ImagePicker onChange={(file, dataUrl) => console.log(file.name, dataUrl.slice(0,30))} />
      <GlassContainer>
        <h1 style={{ textAlign: "center", marginTop: 0 }}>{t("settings")}</h1>

        <SettingsRow>
        <SettingLabel>{t("darkMode")}</SettingLabel>
        <ToggleSwitch checked={dark} onChange={setDark} />
        </SettingsRow>

        <SettingsRow>
        <SettingLabel>{t("switch")}</SettingLabel>
        <ToggleSwitch defaultChecked />
        </SettingsRow>

        <SettingsRow>
        <SettingLabel>{t("switch2")}</SettingLabel>
        <ToggleSwitch />
        </SettingsRow>

        <SettingsRow>
        <SettingLabel>{t("switch3")}</SettingLabel>
        <ToggleSwitch />
        </SettingsRow>
        <div style={{ marginTop: 16 }}>
          <h2 style={{ textAlign: "center", margin: "16px 0 8px" }}> {t("siteLanguage")}</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OptionGroup
              size="sm"
              value={lang}
              onChange={(val) => setLang(val as Lang)}
              options={[
                { label: t("en"), value: "en" },
                { label: t("cs"), value: "cs" },
                { label: t("de"), value: "de" },
              ]}
            />
          </div>
        </div>
      </GlassContainer>
      </div>
    </ThemeProvider>
  );
}
