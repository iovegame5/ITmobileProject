import { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    Image,
    Linking,
    ScrollView,
    Button,
  } from "react-native";
const tabsData = [
  {
    label: 'This Text',
    content:
      'Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.',
  },
  {
    label: 'That Text',
    content:
      'Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.',
  },
];

export function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <View className="">
      <View className="relative">
        <View className="flex flex-row space-x-3 border-b">
          {tabsData.map((tab, idx) => {
            return (
              <Button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className="pt-2 pb-3 bg-white"
                onClick={() => setActiveTabIndex(idx)}
                title={tab.label}
              />
            );
          })}
        </View>
        <View
          className="absolute bottom-0 block h-1 bg-teal-500 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </View>
      <View className="py-4">
        <Text className="text-lg">{tabsData[activeTabIndex].content}</Text>
      </View>
    </View>
  );
}
