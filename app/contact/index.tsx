import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GridBackground from "../../components/GridBackground";
import SectionHeader from "../../components/SectionHeader";
import { COLORS } from "../../constants/colors";

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSend = () => {
    if (!form.email || !form.message) {
      Alert.alert("Missing Info", "Please fill in your email and message.");
      return;
    }

    setIsLoading(true);
    // Simulasi pengiriman data
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Message Sent!", "Thanks for reaching out. I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  // Helper untuk style input yang dinamis
  const getInputStyle = (inputName: string) => [
    styles.input,
    focusedInput === inputName && styles.inputFocused
  ];

  return (
    <GridBackground>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SectionHeader 
            title="Get in Touch" 
            subtitle="Have a project in mind? Let's build something together." 
          />

          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput 
                style={getInputStyle("name")} 
                placeholder="John Doe" 
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={form.name}
                onChangeText={(text) => setForm({...form, name: text})}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={getInputStyle("email")} 
                placeholder="you@domain.com" 
                placeholderTextColor="rgba(255,255,255,0.3)" 
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(text) => setForm({...form, email: text})}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Message Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput 
                style={[getInputStyle("message"), styles.textArea]} 
                placeholder="Tell me about your project..." 
                placeholderTextColor="rgba(255,255,255,0.3)" 
                multiline 
                textAlignVertical="top"
                value={form.message}
                onChangeText={(text) => setForm({...form, message: text})}
                onFocus={() => setFocusedInput("message")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Submit Button */}
            <Pressable 
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleSend}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <Text style={styles.btnText}>Send Message</Text>
                  <Ionicons name="send" size={18} color="#000" />
                </>
              )}
            </Pressable>
          </View>

          {/* Direct Info Section */}
          <View style={styles.directInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={20} color={COLORS.accent} />
              <Text style={styles.infoText}>kaffqa@example.com</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color={COLORS.accent} />
              <Text style={styles.infoText}>Indonesia (Remote Available)</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </GridBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { 
    padding: 24,
    paddingTop: 40,
  },
  formContainer: {
    marginTop: 10,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: { 
    color: COLORS.textSecondary, 
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: COLORS.accent, // Neon border on focus
    backgroundColor: "rgba(0, 229, 255, 0.05)",
  },
  textArea: {
    height: 120,
    paddingTop: 16, // For multiline vertical alignment
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }]
  },
  btnText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  directInfo: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingTop: 24,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  }
});