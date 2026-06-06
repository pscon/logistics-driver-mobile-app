export const fonts = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  bold: 'DMSans_700Bold',
};

export function fontStyle(weight: keyof typeof fonts = 'regular') {
  return { fontFamily: fonts[weight] };
}
