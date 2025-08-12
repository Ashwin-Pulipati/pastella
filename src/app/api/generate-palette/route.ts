import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    strategy,
    paletteSize,
    paletteType,
    aiPrompt,
    selectedKeywords,
  } = await req.json();

  const prompt = `
You are an expert color palette designer specializing in beautiful, attractive, modern, futuristic, and soft pastel colors.
Your task is to generate a harmonically correct pastel color palette based on the user's request.

**Palette Constraints:**
- Color Harmony: ${strategy}
- Number of Colors: ${paletteSize}
- Palette Type: ${paletteType}
- User's Theme/Idea: "${
    aiPrompt ||
    selectedKeywords.join(", ") ||
    "A surprising and beautiful combination"
  }"

**Your Goal:**
Create the most aesthetically pleasing palette possible that fits the theme. You have complete creative freedom to invent entirely new pastel colors or draw inspiration from well-known pastel color names. The final result must be a cohesive, professional-quality palette.

**Output Format:**
The output MUST be a valid JSON object following this exact structure: {"palette": [{"name": "A Creative Color Name", "hex": "#RRGGBB"}]}
`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          palette: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                hex: { type: "STRING" },
                name: { type: "STRING" },
              },
              required: ["hex", "name"],
            },
          },
        },
        required: ["palette"],
      },
    },
  };

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating AI palette:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
