import { chatService } from "@/api/chat";
import BackgroundIcons from "@/components/BackgroundIcons";
import ChatContainer from "@/components/ChatContainer";

import HeroSection from "@/components/HeroSection";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAppStore from "@/state/zustand";
import { motion } from "framer-motion";
import {

  MessageSquareDiff,

  SendHorizontal,
} from "lucide-react";


import { useEffect, useState } from "react";

import RecommenderComponent from "@/components/RecommenderComponent";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function App() {
  const { t } = useTranslation();

  // States for the page
  const [language, setLanguage] = useState(t("English"));
  const [isFocused, setIsFocused] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { text: t("introMessage"), isUser: false, isLoading: false },
  ]);
  const [convHistory, setConvHistory] = useState([
    {
      role: "assistant",
      content: { SQL_QUERY: "No", Response: t("introMessage") },
    },
  ]);
  const { showRecommendation, setShowRecommendation, setLatLongDetails } =
    useAppStore();

  // Use effect for changing the text language whenever there is change in the language
  useEffect(() => {
    const handleLanguageChange = () => {
      setMessages([
        { text: t("introMessage"), isUser: false, isLoading: false },
      ]);
      setConvHistory([
        {
          role: "assistant",
          content: { SQL_QUERY: "No", Response: t("introMessage") },
        },
      ]);
      setLanguage(t("language"));
    };
    // listenere function to change the lnaguae of the page on every change in the language
    i18n.on("languageChanged", handleLanguageChange);

    // To clean up on umount
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, t]);

  const examples = t("examples", { returnObjects: true });

  // Handler funtion for the chat
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // toggle the chat to true so that chatContaienr could come in place of heroSection
    if (!isChat) {
      setIsChat(true);
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: inputValue, isUser: true, isLoading: false },
    ]);
    setConvHistory((prev) => [
      ...prev,
      { role: "user", content: { SQL_QUERY: "No", Response: inputValue } },
    ]);
    const tempMessage = { text: "", isUser: false, isLoading: true };
    setMessages((prev) => [...prev, tempMessage]);
    // backend response from the api
    try {
      const data = await chatService(inputValue, convHistory, language);
      console.log(data);
      setInputValue("");
      //  state updateer to update the state to include current response from the api at the last index
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          text: data.Response,
          isUser: false,
          isLoading: false,
        };
        return updatedMessages;
      });
      console.log(data.lat_long_details_list?.length);

      // Google Map section toggler that checks if there is any object in the latlongDetails then set the latLongDetails to it and set show recommendation to true that displays the google map section from the right side
      if (data.lat_long_details_list?.length > 0) {
        setLatLongDetails(data.lat_long_details_list);
        setShowRecommendation(true);
        console.log(data.lat_long_details_list);
      }

      setConvHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: { SQL_QUERY: data.SQL_QUERY, Response: data.Response },
        },
      ]);
    } catch (error) {
      console.log(error.message || "something went wrong");
      setInputValue("");
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          text: 'Something went wrong please try again',
          isUser: false,
          isLoading: false,
        };
        return updatedMessages;
      });
    }

    console.log(convHistory);
  };

  const handleNewChat = () => {
    setIsChat(false);
    setConvHistory([{ role: "assistant", content: t("introMessage") }]);
    setInputValue("");
    setMessages([{ text: t("introMessage"), isUser: false, isLoading: false }]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white flex relative overflow-hidden">
      <BackgroundIcons />
      {/* Main Content */}
      <div className="container mx-auto  px-4 py-20 relative z-10">
        <div className={`chat-wrapper ${isChat ? "flex flex-col " : ""}`}>
          {isChat ? (
            <div className="h-[65vh] overflow-y-hidden rounded-xl max-w-3xl md:max-w-4xl w-full mx-auto">
              <ChatContainer messages={messages} />
            </div>
          ) : (
            <HeroSection />
          )}
        </div>
        <div className="max-w-3xl md:max-w-4xl w-full mx-auto sticky">
          {/* Glowing Background Effect */}
          <motion.div
            className="absolute -inset-3 bg-cyan-500/15 rounded-xl blur-2xl"
            animate={{
              y: isChat ? "70vh" : 0,
              scale: isFocused ? 1.1 : 1,
              opacity: isFocused ? 0.8 : 0.5,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />

          {/* Additional glow layers for more intensity */}
          <motion.div
            className="absolute -inset-3 bg-cyan-600/60 rounded-xl blur-3xl"
            animate={{
              scale: isFocused ? 1.15 : 1.05,
              opacity: isFocused ? 0.6 : 0.4,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />

          <div className="relative border-slate-500 border min-h-[120px] bg-gray-900/90 rounded-3xl transition-all ease-in py-1 focus-within:border-2 focus-within:border-cyan-400">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full textarea h-20 border-none bg-transparent text-white placeholder:text-gray-400 text-lg p-6 rounded-3xl relative z-10 backdrop-blur-sm resize-none"
              placeholder={t("textArea.placeholder")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="sendButton flex justify-end gap-2  items-center p-1 mr-1">
              {isChat && (
                <Button
                  onClick={handleNewChat}
                  className="bg-slate-700 rounded-full flex items-center"
                >
                  <MessageSquareDiff
                    className="h-12 w-12"
                    absoluteStrokeWidth
                  />{" "}
                  <span>{t("textArea.newChatBtn")}</span>
                </Button>
              )}
              <LanguageSelector language={language} setLanguage={setLanguage} />
              <Button
                variant="outline"
                onClick={handleSend}
                className="text-slate-800  rounded-full  bg-white transition-all ease-in hover:bg-slate-800 hover:text-white"
              >
                <SendHorizontal
                  className="h-16 w-16"
                  strokeWidth={2.5}
                  absoluteStrokeWidth
                />
                <span className="font-semibold">{t("textArea.sendBtn")}</span>
              </Button>
            </div>
          </div>
        </div>
        {/* Example Buttons */}
        {!isChat && (
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl   mt-6  mx-auto ">
            <div className="suggestions flex flex-wrap gap-2 justify-center ">
              {examples.map((query, index) => (
                <Button
                  key={index}
                  onClick={() => setInputValue(query.prompt)}
                  className=" rounded-full bg-transparent text-slate-300 hover:bg-gray-900/50 transition-colors text-sm backdrop-blur-sm border border-slate-300"
                >
                  <span>{query.exampleText}</span>
                  {/* <ArrowUpRight className="text-cyan-400"/> */}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>{showRecommendation && <RecommenderComponent />}</div>
    </div>
  );
}
