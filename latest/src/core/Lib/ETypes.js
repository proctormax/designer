qPack("ETypes",function( CLOUD = {} ){
     //-------------------------------- INCLUDES(0) ----

     //et Hikestone = {CFramework:{Core:{}},UI:{},Event:{},Util:{}, System:{},Platform:window, Mathematics:{},Core:{}};

     /////////////////////////////////////////////////////////////////////////////////////

     

     let EGlobalColor = {

              Color0 : "dodgerblue",

              Color1 : "maroon",

              Black : "black",

              White : "white",

              DarkGray : "darkGray",

              Gray : "gray",

              LightGray : "lightGray",

              Red : "red",

              Green : "green",

              Blue : "blue",

              Cyan : "cyan",

              Magenta : "magenta",

              Yellow : "yellow",

              DarkRed : "darkRed",

              DarkGreen : "darkGreen",

              DarkBlue : "darkBlue",

              DarkCyan : "darkCyan",

              DarkMagenta : "darkMagenta",

              DarkYellow : "darkYellow",

              Transparent : "transparent"

          };

     let EKeyboardModifier = {

              NoModifier          :0x00000000,

              ShiftModifier       :0x02000000,

              ControlModifier     :0x04000000,

              AltModifier         :0x08000000,

              MetaModifier        :0x10000000,

              KeypadModifier      :0x20000000,

              GroupSwitchModifier :0x40000000,

                  // Do not extend the mask to include 0x01000000

              KeyboardModifierMask:0xFE000000

          };

         //     Q_DECLARE_FLAGS(KeyboardModifiers, KeyboardModifier)

          //shorter names for shortcuts

     let EModifier = {

              META         :CLOUD.MetaModifier,

              SHIFT        :CLOUD.ShiftModifier,

              CTRL         :CLOUD.ControlModifier,

              ALT          :CLOUD.AltModifier,

              MODIFIER_MASK:CLOUD.KeyboardModifierMask,

              UNICODE_ACCEL:0x00000000

          };

     let EMouseButton = {

              NoButton        :0x00000000,

              LeftButton      :0x00000001,

              RightButton     :0x00000002,

              MiddleButton    :0x00000004,

              XButton1        :0x00000008,

              XButton2        :0x00000010,

              MouseButtonMask :0x000000FF

          };

         //     Q_DECLARE_FLAGS(MouseButtons, MouseButton)

         // #ifdef QT3_SUPPORT

     let EButtonState = {

              ShiftButton    : CLOUD.ShiftModifier,

              ControlButton  : CLOUD.ControlModifier,

              AltButton      : CLOUD.AltModifier,

              MetaButton     : CLOUD.MetaModifier,

              Keypad         : CLOUD.KeypadModifier,

              KeyButtonMask  : CLOUD.KeyboardModifierMask

          };

      // const int ButtonState;

      //#endif

     let EOrientation = {

              Horizontal:0x0,

              Vertical:0x1

          };

         //     Q_DECLARE_FLAGS(Orientations, Orientation)

     let EFocusPolicy = {

              NoFocus:0,

              TabFocus:0x1,

              ClickFocus:0x2,

              StrongFocus: CLOUD.TabFocus | 0x2 | 0x8,

              WheelFocus: CLOUD.StrongFocus | 0x4

          };

     let ESortOrder = {

              AscendingOrder: -1,

              DescendingOrder: -1,

              Ascending:CLOUD.AscendingOrder,

              Descending:CLOUD.DescendingOrder

      //#endif

          };

     let ETileRule = {

              StretchTile: -1,

              RepeatTile: -1,

              RoundTile: -1

          };

              // Text formatting flags for QPainter::drawText and QLabel.

              // The following two enums can be combined to one integer which

              // is passed as 'flags' to drawText and qt_format_text.

     let EAlignmentFlag = {

              AlignLeft:0x0001,

              AlignLeading: CLOUD.AlignLeft,

              AlignRight:0x0002,

              AlignTrailing: CLOUD.AlignRight,

              AlignHCenter:0x0004,

              AlignJustify:0x0008,

              AlignAbsolute:0x0010,

              AlignHorizontal_Mask:  CLOUD.AlignLeft |  CLOUD.AlignRight |  CLOUD.AlignHCenter |  CLOUD.AlignJustify |  CLOUD.AlignAbsolute,

              AlignTop:0x0020,

              AlignBottom:0x0040,

              AlignVCenter:0x0080,

              AlignVertical_Mask: CLOUD.AlignTop |  CLOUD.AlignBottom |  CLOUD.AlignVCenter,

              AlignCenter: CLOUD.AlignVCenter |  CLOUD.AlignHCenter,

         // #if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

              AlignAuto: CLOUD.AlignLeft

      //#endif

          };

         //     Q_DECLARE_FLAGS(Alignment, AlignmentFlag)

     let ETextFlag = {

              TextSingleLine:0x0100,

              TextDontClip:0x0200,

              TextExpandTabs:0x0400,

              TextShowMnemonic:0x0800,

              TextWordWrap:0x1000,

              TextWrapAnywhere:0x2000,

              TextDontPrint:0x4000,

              TextIncludeTrailingSpaces:0x08000000,

              TextHideMnemonic:0x8000,

              TextJustificationForced:0x10000,

              TextForceLeftToRight:0x20000,

              TextForceRightToLeft:0x40000,

              TextLongestVariant:0x80000,

              TextBypassShaping:0x100000,

         // #if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

              SingleLine: CLOUD.TextSingleLine,

              DontClip: CLOUD.TextDontClip,

              ExpandTabs: CLOUD.TextExpandTabs,

              ShowPrefix: CLOUD.TextShowMnemonic,

              WordBreak: CLOUD.TextWordWrap,

              BreakAnywhere: CLOUD.TextWrapAnywhere,

              DontPrint: CLOUD.TextDontPrint,

              IncludeTrailingSpaces: CLOUD.TextIncludeTrailingSpaces,

              NoAccel: CLOUD.TextHideMnemonic

      //#endif

          };

         // #ifdef QT3_SUPPORT

             // typedef TextFlag TextFlags;

      //#endif

     let ETextElideMode = {

              ElideLeft: 0x01,

              ElideRight: 0x02,

              ElideMiddle: 0x03,

              ElideNone: 0x0

          };

     let EWindowType = {

         Widget:0x00000000,

         Window:0x00000001,

         Dialog:0x00000002 | CLOUD.Window,

         Sheet:0x00000004 | CLOUD.Window,

         Drawer:0x00000006 | CLOUD.Window,

         Popup:0x00000008 | CLOUD.Window,

         Tool:0x0000000A | CLOUD.Window,

         ToolTip:0x0000000C | CLOUD.Window,

         SplashScreen:0x0000000E | CLOUD.Window,

         Desktop:0x00000010 | CLOUD.Window,

         SubWindow: 0x00000012,

         WindowType_Mask:0x000000FF,

         MSWindowsFixedSizeDialogHint:0x00000100,

         MSWindowsOwnDC:0x00000200,

         X11BypassWindowManagerHint:0x00000400,

         FramelessWindowHint:0x00000800,

         WindowTitleHint:0x00001000,

         WindowSystemMenuHint:0x00002000,

         WindowMinimizeButtonHint:0x00004000,

         WindowMaximizeButtonHint:0x00008000,

         WindowMinMaxButtonsHint: CLOUD.WindowMinimizeButtonHint |  CLOUD.WindowMaximizeButtonHint,

         WindowContextHelpButtonHint:0x00010000,

         WindowShadeButtonHint:0x00020000,

         WindowStaysOnTopHint:0x00040000,

         // reserved for Qt3Support:

         // WMouseNoMask:0x00080000,

         // WDestructiveClose:0x00100000,

         // WStaticContents:0x00200000,

         // WGroupLeader:0x00400000,

         // WShowModal:0x00800000,

         // WNoMousePropagation:0x01000000,

         CustomizeWindowHint:0x02000000,

         WindowStaysOnBottomHint:0x04000000,

         WindowCloseButtonHint:0x08000000,

         MacWindowToolBarButtonHint:0x10000000,

         BypassGraphicsProxyWidget:0x20000000,

         WindowOkButtonHint:0x00080000,

         WindowCancelButtonHint:0x00100000,

         WindowSoftkeysVisibleHint:0x40000000,

         WindowSoftkeysRespondHint:0x80000000

         // #ifdef QT3_SUPPORT

         ,

         WMouseNoMask:0x00080000,

         WDestructiveClose:0x00100000,

         WStaticContents:0x00200000,

         WGroupLeader:0x00400000,

         WShowModal:0x00800000,

         WNoMousePropagation:0x01000000,

         WType_TopLevel:CLOUD.Window,

         WType_Dialog: CLOUD.Dialog,

         WType_Popup: CLOUD.Popup,

         WType_Desktop: CLOUD.Desktop,

         WType_Mask: CLOUD.WindowType_Mask,

         WStyle_Customize:0,

         WStyle_NormalBorder:0,

         WStyle_DialogBorder:CLOUD.MSWindowsFixedSizeDialogHint,

         WStyle_NoBorder:CLOUD.FramelessWindowHint,

         WStyle_Title:CLOUD.WindowTitleHint,

         WStyle_SysMenu:CLOUD.WindowSystemMenuHint,

         WStyle_Minimize:CLOUD.WindowMinimizeButtonHint,

         WStyle_Maximize:CLOUD.WindowMaximizeButtonHint,

         WStyle_MinMax:CLOUD.WStyle_Minimize | CLOUD.WStyle_Maximize,

         WStyle_Tool: CLOUD.Tool,

         WStyle_StaysOnTop: CLOUD.WindowStaysOnTopHint,

         WStyle_ContextHelp: CLOUD.WindowContextHelpButtonHint,

             // misc flags

         WPaintDesktop:0,

         WPaintClever:0,

         WX11BypassWM           :CLOUD.X11BypassWindowManagerHint,

         WWinOwnDC              :CLOUD.MSWindowsOwnDC,

         WMacSheet              :CLOUD.Sheet,

         WMacDrawer             :CLOUD.Drawer,

         WStyle_Splash          :CLOUD.SplashScreen,

         WNoAutoErase          :0,

         WRepaintNoErase       :0,

         WNorthWestGravity     :CLOUD.WStaticContents,

         WType_Modal           :CLOUD.Dialog | CLOUD.WShowModal,

         WStyle_Dialog         :CLOUD.Dialog,

         WStyle_NoBorderEx     :CLOUD.FramelessWindowHint,

         WResizeNoErase:0,

         WMacNoSheet:0

         //#endif

     };

             // Q_DECLARE_FLAGS(WindowFlags, WindowType)

     let EWindowState = {

         WindowNoState   :0x00000000,

         WindowMinimized :0x00000001,

         WindowMaximized :0x00000002,

         WindowFullScreen:0x00000004,

         WindowActive    :0x00000008

     };

         //     Q_DECLARE_FLAGS(WindowStates, WindowState)

     let EWidgetAttribute = {

         WA_Disabled:0,

         WA_UnderMouse:1,

         WA_MouseTracking:2,

         WA_ContentsPropagated:3, // ## deprecated

         WA_OpaquePaintEvent:4,

         WA_NoBackground:CLOUD.WA_OpaquePaintEvent, // ## deprecated

         WA_StaticContents:5,

         WA_LaidOut:7,

         WA_PaintOnScreen:8,

         WA_NoSystemBackground:9,

         WA_UpdatesDisabled:10,

         WA_Mapped:11,

         WA_MacNoClickThrough:12, // Mac only

         WA_PaintOutsidePaintEvent:13,

         WA_InputMethodEnabled:14,

         WA_WState_Visible:15,

         WA_WState_Hidden:16,

         WA_ForceDisabled:32,

         WA_KeyCompression:33,

         WA_PendingMoveEvent:34,

         WA_PendingResizeEvent:35,

         WA_SetPalette:36,

         WA_SetFont:37,

         WA_SetCursor:38,

         WA_NoChildEventsFromChildren:39,

         WA_WindowModified:41,

         WA_Resized:42,

         WA_Moved:43,

         WA_PendingUpdate:44,

         WA_InvalidSize:45,

         WA_MacBrushedMetal:46, // Mac only

         WA_MacMetalStyle: CLOUD.WA_MacBrushedMetal, // obsolete

         WA_CustomWhatsThis:47,

         WA_LayoutOnEntireRect:48,

         WA_OutsideWSRange:49,

         WA_GrabbedShortcut:50,

         WA_TransparentForMouseEvents:51,

         WA_PaintUnclipped:52,

         WA_SetWindowIcon:53,

         WA_NoMouseReplay:54,

         WA_DeleteOnClose:55,

         WA_RightToLeft:56,

         WA_SetLayoutDirection:57,

         WA_NoChildEventsForParent:58,

         WA_ForceUpdatesDisabled:59,

         WA_WState_Created:60,

         WA_WState_CompressKeys:61,

         WA_WState_InPaintEvent:62,

         WA_WState_Reparented:63,

         WA_WState_ConfigPending:64,

         WA_WState_Polished:66,

         WA_WState_DND:67, // ## deprecated

         WA_WState_OwnSizePolicy:68,

         WA_WState_ExplicitShowHide:69,

         WA_ShowModal:70, // ## deprecated

         WA_MouseNoMask:71,

         WA_GroupLeader:72, // ## deprecated

         WA_NoMousePropagation:73, // ## for now, might go away.

         WA_Hover:74,

         WA_InputMethodTransparent:75, // Don't reset IM when user clicks on this (for virtual keyboards on embedded)

         WA_QuitOnClose:76,

         WA_KeyboardFocusChange:77,

         WA_AcceptDrops:78,

         WA_DropSiteRegistered:79, // internal

         WA_ForceAcceptDrops:CLOUD.WA_DropSiteRegistered, // ## deprecated

         WA_WindowPropagation:80,

         WA_NoX11EventCompression:81,

         WA_TintedBackground:82,

         WA_X11OpenGLOverlay:83,

         WA_AlwaysShowToolTips:84,

         WA_MacOpaqueSizeGrip:85,

         WA_SetStyle:86,

         WA_SetLocale:87,

         WA_MacShowFocusRect:88,

         WA_MacNormalSize:89,  // Mac only

         WA_MacSmallSize:90,   // Mac only

         WA_MacMiniSize:91,    // Mac only

         WA_LayoutUsesWidgetRect:92,

         WA_StyledBackground:93, // internal

         WA_MSWindowsUseDirect3D:94, // Win only

         WA_CanHostQMdiSubWindowTitleBar:95, // Internal

         WA_MacAlwaysShowToolWindow:96, // Mac only

         WA_StyleSheet:97, // internal

         WA_ShowWithoutActivating:98,

         WA_X11BypassTransientForHint:99,

         WA_NativeWindow:100,

         WA_DontCreateNativeAncestors:101,

         WA_MacVariableSize:102,    // Mac only

         WA_DontShowOnScreen:103,

         // window types from http://standards.freedesktop.org/wm-spec/

         WA_X11NetWmWindowTypeDesktop:104,

         WA_X11NetWmWindowTypeDock:105,

         WA_X11NetWmWindowTypeToolBar:106,

         WA_X11NetWmWindowTypeMenu:107,

         WA_X11NetWmWindowTypeUtility:108,

         WA_X11NetWmWindowTypeSplash:109,

         WA_X11NetWmWindowTypeDialog:110,

         WA_X11NetWmWindowTypeDropDownMenu:111,

         WA_X11NetWmWindowTypePopupMenu:112,

         WA_X11NetWmWindowTypeToolTip:113,

         WA_X11NetWmWindowTypeNotification:114,

         WA_X11NetWmWindowTypeCombo:115,

         WA_X11NetWmWindowTypeDND:116,

         WA_MacFrameworkScaled :117,

         WA_SetWindowModality:118,

         WA_WState_WindowOpacitySet:119, // internal

         WA_TranslucentBackground:120,

         WA_AcceptTouchEvents:121,

         WA_WState_AcceptedTouchBeginEvent:122,

         WA_TouchPadAcceptSingleTouchEvents:123,

         WA_MergeSoftkeys: 124,

         WA_MergeSoftkeysRecursively: 125,

         // #if 0 // these values are reserved for Maemo5 - do not re-use them

         WA_Maemo5NonComposited:126,

         WA_Maemo5StackedWindow:127,

         //#endif

         WA_LockPortraitOrientation:128,

         WA_LockLandscapeOrientation:129,

         WA_AutoOrientation:130,

         // #if 0 // these values are reserved for Maemo5 - do not re-use them

         WA_Maemo5PortraitOrientation: CLOUD.WA_LockPortraitOrientation,

         WA_Maemo5LandscapeOrientation: CLOUD.WA_LockLandscapeOrientation,

         WA_Maemo5AutoOrientation: CLOUD.WA_AutoOrientation,

         WA_Maemo5ShowProgressIndicator:131,

         //#endif

         WA_X11DoNotAcceptFocus:132,

         WA_SymbianNoSystemRotation:133,

         WA_MacNoShadow:134,

         // Add new attributes before this line

         WA_AttributeCount:-1

     };

     let EApplicationAttribute =
     {

         AA_ImmediateWidgetCreation:0,

         AA_MSWindowsUseDirect3DByDefault:1, // Win only

         AA_DontShowIconsInMenus:2,

         AA_NativeWindows:3,

         AA_DontCreateNativeWidgetSiblings:4,

         AA_MacPluginApplication:5,

         AA_DontUseNativeMenuBar:6,

         AA_MacDontSwapCtrlAndMeta:7,

         AA_S60DontConstructApplicationPanes:8,

         AA_S60DisablePartialScreenInputMode:9,

         AA_X11InitThreads:10,

         AA_CaptureMultimediaKeys:11,

         // Add new attributes before this line

         AA_AttributeCount:-1

     };

     // Image conversion flags.  The unusual ordering is caused by

     // compatibility and default requirements.

     let EImageConversionFlag = {

         ColorMode_Mask         :0x00000003,

         AutoColor              :0x00000000,

         ColorOnly              :0x00000003,

         MonoOnly               :0x00000002,

         // Reserved            :0x00000001,

         AlphaDither_Mask       :0x0000000C,

         ThresholdAlphaDither   :0x00000000,

         OrderedAlphaDither     :0x00000004,

         DiffuseAlphaDither     :0x00000008,

         NoAlpha                :0x0000000C, // Not supported

         Dither_Mask            :0x00000030,

         DiffuseDither          :0x00000000,

         OrderedDither          :0x00000010,

         ThresholdDither        :0x00000020,

         // ReservedDither      :0x00000030,

         DitherMode_Mask        :0x000000C0,

         AutoDither             :0x00000000,

         PreferDither           :0x00000040,

         AvoidDither            :0x00000080,

         NoOpaqueDetection      :0x00000100,

         NoFormatConversion     :0x00000200

     };

     //  Q_DECLARE_FLAGS(ImageConversionFlags, ImageConversionFlag)

     let EBGMode = {

              TransparentMode:-1,

              OpaqueMode:-1

         };

     // #ifdef QT3_SUPPORT

     let EPaintUnit = {                                // paint unit

             PixelUnit:-1

         };

     let EGUIStyle = {

              MacStyle:-1,

              WindowsStyle:-1,

              Win3Style:-1,

              PMStyle:-1,

              MotifStyle:-1

          };

      //#endif

     let EKey = {

         Key_Escape:0x01000000,                // misc keys

         Key_Tab:0x01000001,

         Key_Backtab:0x01000002,

         // #if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

         Key_BackTab:CLOUD.Key_Backtab,

         //#endif

         Key_Backspace:0x01000003,

         //// #if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

         Key_BackSpace:CLOUD.Key_Backspace,

         //#endif

         Key_Return:0x01000004,

         Key_Enter:0x01000005,

         Key_Insert:0x01000006,

         Key_Delete:0x01000007,

         Key_Pause:0x01000008,

         Key_Print:0x01000009,

         Key_SysReq:0x0100000A,

         Key_Clear:0x0100000B,

         Key_Home:0x01000010,                // cursor movement

         Key_End:0x01000011,

         Key_Left:0x01000012,

         Key_Up:0x01000013,

         Key_Right:0x01000014,

         Key_Down:0x01000015,

         Key_PageUp:0x01000016,

         //#if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

         Key_Prior:CLOUD.Key_PageUp,

         //#endif

         Key_PageDown:0x01000017,

         //#if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

         Key_Next:CLOUD.Key_PageDown,

         //#endif

         Key_Shift:0x01000020,                // modifiers

         Key_Control:0x01000021,

         Key_Meta:0x01000022,

         Key_Alt:0x01000023,

         Key_CapsLock:0x01000024,

         Key_NumLock:0x01000025,

         Key_ScrollLock:0x01000026,

         Key_F1:0x01000030,                // function keys

         Key_F2:0x01000031,

         Key_F3:0x01000032,

         Key_F4:0x01000033,

         Key_F5:0x01000034,

         Key_F6:0x01000035,

         Key_F7:0x01000036,

         Key_F8:0x01000037,

         Key_F9:0x01000038,

         Key_F10:0x01000039,

         Key_F11:0x0100003A,

         Key_F12:0x0100003B,

         Key_F13:0x0100003C,

         Key_F14:0x0100003D,

         Key_F15:0x0100003E,

         Key_F16:0x0100003F,

         Key_F17:0x01000040,

         Key_F18:0x01000041,

         Key_F19:0x01000042,

         Key_F20:0x01000043,

         Key_F21:0x01000044,

         Key_F22:0x01000045,

         Key_F23:0x01000046,

         Key_F24:0x01000047,

         Key_F25:0x01000048,                // F25 .. F35 only on X11

         Key_F26:0x01000049,

         Key_F27:0x0100004A,

         Key_F28:0x0100004B,

         Key_F29:0x0100004C,

         Key_F30:0x0100004D,

         Key_F31:0x0100004E,

         Key_F32:0x0100004F,

         Key_F33:0x01000050,

         Key_F34:0x01000051,

         Key_F35:0x01000052,

         Key_Super_L:0x01000053,                 // extra keys

         Key_Super_R:0x01000054,

         Key_Menu:0x01000055,

         Key_Hyper_L:0x01000056,

         Key_Hyper_R:0x01000057,

         Key_Help:0x01000058,

         Key_Direction_L:0x01000059,

         Key_Direction_R:0x01000060,

         Key_Space:0x20,                // 7 bit printable ASCII

         Key_Any:0x20,

         Key_Exclam:0x21,

         Key_QuoteDbl:0x22,

         Key_NumberSign:0x23,

         Key_Dollar:0x24,

         Key_Percent:0x25,

         Key_Ampersand:0x26,

         Key_Apostrophe:0x27,

         Key_ParenLeft:0x28,

         Key_ParenRight:0x29,

         Key_Asterisk:0x2A,

         Key_Plus:0x2B,

         Key_Comma:0x2C,

         Key_Minus:0x2D,

         Key_Period:0x2E,

         Key_Slash:0x2F,

         Key_0:0x30,

         Key_1:0x31,

         Key_2:0x32,

         Key_3:0x33,

         Key_4:0x34,

         Key_5:0x35,

         Key_6:0x36,

         Key_7:0x37,

         Key_8:0x38,

         Key_9:0x39,

         Key_Colon:0x3A,

         Key_Semicolon:0x3B,

         Key_Less:0x3C,

         Key_Equal:0x3D,

         Key_Greater:0x3E,

         Key_Question:0x3F,

         Key_At:0x40,

         Key_A:0x41,

         Key_B:0x42,

         Key_C:0x43,

         Key_D:0x44,

         Key_E:0x45,

         Key_F:0x46,

         Key_G:0x47,

         Key_H:0x48,

         Key_I:0x49,

         Key_J:0x4A,

         Key_K:0x4B,

         Key_L:0x4C,

         Key_M:0x4D,

         Key_N:0x4E,

         Key_O:0x4F,

         Key_P:0x50,

         Key_Q:0x51,

         Key_R:0x52,

         Key_S:0x53,

         Key_T:0x54,

         Key_U:0x55,

         Key_V:0x56,

         Key_W:0x57,

         Key_X:0x58,

         Key_Y:0x59,

         Key_Z:0x5A,

         Key_BracketLeft:0x5B,

         Key_Backslash:0x5C,

         Key_BracketRight:0x5D,

         Key_AsciiCircum:0x5E,

         Key_Underscore:0x5F,

         Key_QuoteLeft:0x60,

         Key_BraceLeft:0x7B,

         Key_Bar:0x7C,

         Key_BraceRight:0x7D,

         Key_AsciiTilde:0x7E,

         Key_nobreakspace:0x0A0,

         Key_exclamdown:0x0A1,

         Key_cent:0x0A2,

         Key_sterling:0x0A3,

         Key_currency:0x0A4,

         Key_yen:0x0A5,

         Key_brokenbar:0x0A6,

         Key_section:0x0A7,

         Key_diaeresis:0x0A8,

         Key_copyright:0x0A9,

         Key_ordfeminine:0x0AA,

         Key_guillemotleft:0x0AB,        // left angle quotation mark

         Key_notsign:0x0AC,

         Key_hyphen:0x0AD,

         Key_registered:0x0AE,

         Key_macron:0x0AF,

         Key_degree:0x0B0,

         Key_plusminus:0x0B1,

         Key_twosuperior:0x0B2,

         Key_threesuperior:0x0B3,

         Key_acute:0x0B4,

         Key_mu:0x0B5,

         Key_paragraph:0x0B6,

         Key_periodcentered:0x0B7,

         Key_cedilla:0x0B8,

         Key_onesuperior:0x0B9,

         Key_masculine:0x0BA,

         Key_guillemotright:0x0BB,        // right angle quotation mark

         Key_onequarter:0x0BC,

         Key_onehalf:0x0BD,

         Key_threequarters:0x0BE,

         Key_questiondown:0x0BF,

         Key_Agrave:0x0C0,

         Key_Aacute:0x0C1,

         Key_Acircumflex:0x0C2,

         Key_Atilde:0x0C3,

         Key_Adiaeresis:0x0C4,

         Key_Aring:0x0C5,

         Key_AE:0x0C6,

         Key_Ccedilla:0x0C7,

         Key_Egrave:0x0C8,

         Key_Eacute:0x0C9,

         Key_Ecircumflex:0x0CA,

         Key_Ediaeresis:0x0CB,

         Key_Igrave:0x0CC,

         Key_Iacute:0x0CD,

         Key_Icircumflex:0x0CE,

         Key_Idiaeresis:0x0CF,

         Key_ETH:0x0D0,

         Key_Ntilde:0x0D1,

         Key_Ograve:0x0D2,

         Key_Oacute:0x0D3,

         Key_Ocircumflex:0x0D4,

         Key_Otilde:0x0D5,

         Key_Odiaeresis:0x0D6,

         Key_multiply:0x0D7,

         Key_Ooblique:0x0D8,

         Key_Ugrave:0x0D9,

         Key_Uacute:0x0DA,

         Key_Ucircumflex:0x0DB,

         Key_Udiaeresis:0x0DC,

         Key_Yacute:0x0DD,

         Key_THORN:0x0DE,

         Key_ssharp:0x0DF,

         //#if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

         Key_agrave: CLOUD.Key_Agrave,

         Key_aacute: CLOUD.Key_Aacute,

         Key_acircumflex: CLOUD.Key_Acircumflex,

         Key_atilde: CLOUD.Key_Atilde,

         Key_adiaeresis: CLOUD.Key_Adiaeresis,

         Key_aring: CLOUD.Key_Aring,

         Key_ae: CLOUD.Key_AE,

         Key_ccedilla: CLOUD.Key_Ccedilla,

         Key_egrave: CLOUD.Key_Egrave,

         Key_eacute: CLOUD.Key_Eacute,

         Key_ecircumflex: CLOUD.Key_Ecircumflex,

         Key_ediaeresis: CLOUD.Key_Ediaeresis,

         Key_igrave: CLOUD.Key_Igrave,

         Key_iacute: CLOUD.Key_Iacute,

         Key_icircumflex: CLOUD.Key_Icircumflex,

         Key_idiaeresis: CLOUD.Key_Idiaeresis,

         Key_eth: CLOUD.Key_ETH,

         Key_ntilde: CLOUD.Key_Ntilde,

         Key_ograve: CLOUD.Key_Ograve,

         Key_oacute: CLOUD.Key_Oacute,

         Key_ocircumflex: CLOUD.Key_Ocircumflex,

         Key_otilde: CLOUD.Key_Otilde,

         Key_odiaeresis: CLOUD.Key_Odiaeresis,

         //#endif

         Key_division:0x0F7,

         //#if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

         Key_oslash:CLOUD.Key_Ooblique,

         Key_ugrave:CLOUD.Key_Ugrave,

         Key_uacute:CLOUD.Key_Uacute,

         Key_ucircumflex:CLOUD.Key_Ucircumflex,

         Key_udiaeresis:CLOUD.Key_Udiaeresis,

         Key_yacute:CLOUD.Key_Yacute,

         Key_thorn:CLOUD.Key_THORN,

         //#endif

         Key_ydiaeresis:0x0FF,

         // International input method support (X keycode - 0xEE00, the

         // definition follows Qt/Embedded 2.3.7) Only interesting if

         // you are writing your own input method

         // International & multi-key character composition

         Key_AltGr              :0x01001103,

         Key_Multi_key          :0x01001120,  // Multi-key character compose

         Key_Codeinput          :0x01001137,

         Key_SingleCandidate    :0x0100113C,

         Key_MultipleCandidate  :0x0100113D,

         Key_PreviousCandidate  :0x0100113E,

         // Misc Functions

         Key_Mode_switch        :0x0100117E,  // Character set switch

         //Key_script_switch      :0x0100117E,  // Alias for mode_switch

         // Japanese keyboard support

         Key_Kanji              :0x01001121,  // Kanji, Kanji convert

         Key_Muhenkan           :0x01001122,  // Cancel Conversion

         //Key_Henkan_Mode        :0x01001123,  // Start/Stop Conversion

         Key_Henkan             :0x01001123,  // Alias for Henkan_Mode

         Key_Romaji             :0x01001124,  // to Romaji

         Key_Hiragana           :0x01001125,  // to Hiragana

         Key_Katakana           :0x01001126,  // to Katakana

         Key_Hiragana_Katakana  :0x01001127,  // Hiragana/Katakana toggle

         Key_Zenkaku            :0x01001128,  // to Zenkaku

         Key_Hankaku            :0x01001129,  // to Hankaku

         Key_Zenkaku_Hankaku    :0x0100112A,  // Zenkaku/Hankaku toggle

         Key_Touroku            :0x0100112B,  // Add to Dictionary

         Key_Massyo             :0x0100112C,  // Delete from Dictionary

         Key_Kana_Lock          :0x0100112D,  // Kana Lock

         Key_Kana_Shift         :0x0100112E,  // Kana Shift

         Key_Eisu_Shift         :0x0100112F,  // Alphanumeric Shift

         Key_Eisu_toggle        :0x01001130,  // Alphanumeric toggle

         //Key_Kanji_Bangou       :0x01001137,  // Codeinput

         //Key_Zen_Koho           :0x0100113D,  // Multiple/All Candidate(s)

         //Key_Mae_Koho           :0x0100113E,  // Previous Candidate

         // Korean keyboard support

         //

         // In fact, many Korean users need only 2 keys, Key_Hangul and

         // Key_Hangul_Hanja. But rest of the keys are good for future.

         Key_Hangul             :0x01001131,  // Hangul start/stop(toggle)

         Key_Hangul_Start       :0x01001132,  // Hangul start

         Key_Hangul_End         :0x01001133,  // Hangul end, English start

         Key_Hangul_Hanja       :0x01001134,  // Start Hangul->Hanja Conversion

         Key_Hangul_Jamo        :0x01001135,  // Hangul Jamo mode

         Key_Hangul_Romaja      :0x01001136,  // Hangul Romaja mode

         //Key_Hangul_Codeinput   :0x01001137,  // Hangul code input mode

         Key_Hangul_Jeonja      :0x01001138,  // Jeonja mode

         Key_Hangul_Banja       :0x01001139,  // Banja mode

         Key_Hangul_PreHanja    :0x0100113A,  // Pre Hanja conversion

         Key_Hangul_PostHanja   :0x0100113B,  // Post Hanja conversion

         //Key_Hangul_SingleCandidate  :0x0100113C,  // Single candidate

         //Key_Hangul_MultipleCandidate:0x0100113D,  // Multiple candidate

         //Key_Hangul_PreviousCandidate:0x0100113E,  // Previous candidate

         Key_Hangul_Special     :0x0100113F,  // Special symbols

         //Key_Hangul_switch      :0x0100117E,  // Alias for mode_switch

         // dead keys (X keycode - 0xED00 to avoid the conflict)

         Key_Dead_Grave         :0x01001250,

         Key_Dead_Acute         :0x01001251,

         Key_Dead_Circumflex    :0x01001252,

         Key_Dead_Tilde         :0x01001253,

         Key_Dead_Macron        :0x01001254,

         Key_Dead_Breve         :0x01001255,

         Key_Dead_Abovedot      :0x01001256,

         Key_Dead_Diaeresis     :0x01001257,

         Key_Dead_Abovering     :0x01001258,

         Key_Dead_Doubleacute   :0x01001259,

         Key_Dead_Caron         :0x0100125A,

         Key_Dead_Cedilla       :0x0100125B,

         Key_Dead_Ogonek        :0x0100125C,

         Key_Dead_Iota          :0x0100125D,

         Key_Dead_Voiced_Sound  :0x0100125E,

         Key_Dead_Semivoiced_Sound:0x0100125F,

         Key_Dead_Belowdot      :0x01001260,

         Key_Dead_Hook          :0x01001261,

         Key_Dead_Horn          :0x01001262,

         // multimedia/internet keys - ignored by default - see QKeyEvent c'tor

         Key_Back :0x01000061,

         Key_Forward :0x01000062,

         Key_Stop :0x01000063,

         Key_Refresh :0x01000064,

         Key_VolumeDown:0x01000070,

         Key_VolumeMute :0x01000071,

         Key_VolumeUp:0x01000072,

         Key_BassBoost:0x01000073,

         Key_BassUp:0x01000074,

         Key_BassDown:0x01000075,

         Key_TrebleUp:0x01000076,

         Key_TrebleDown:0x01000077,

         Key_MediaPlay :0x01000080,

         Key_MediaStop :0x01000081,

         Key_MediaPrevious :0x01000082,

         //#if defined(QT3_SUPPORT) && !defined(Q_MOC_RUN)

         Key_MediaPrev :CLOUD.Key_MediaPrevious,

         //#endif

         Key_MediaNext :0x01000083,

         Key_MediaRecord:0x01000084,

         Key_MediaPause:0x1000085,

         Key_MediaTogglePlayPause:0x1000086,

         Key_HomePage :0x01000090,

         Key_Favorites :0x01000091,

         Key_Search :0x01000092,

         Key_Standby:0x01000093,

         Key_OpenUrl:0x01000094,

         Key_LaunchMail :0x010000A0,

         Key_LaunchMedia:0x010000A1,

         Key_Launch0 :0x010000A2,

         Key_Launch1 :0x010000A3,

         Key_Launch2 :0x010000A4,

         Key_Launch3 :0x010000A5,

         Key_Launch4 :0x010000A6,

         Key_Launch5 :0x010000A7,

         Key_Launch6 :0x010000A8,

         Key_Launch7 :0x010000A9,

         Key_Launch8 :0x010000AA,

         Key_Launch9 :0x010000AB,

         Key_LaunchA :0x010000AC,

         Key_LaunchB :0x010000AD,

         Key_LaunchC :0x010000AE,

         Key_LaunchD :0x010000AF,

         Key_LaunchE :0x010000B0,

         Key_LaunchF :0x010000B1,

         Key_MonBrightnessUp:0x010000B2,

         Key_MonBrightnessDown:0x010000B3,

         Key_KeyboardLightOnOff:0x010000B4,

         Key_KeyboardBrightnessUp:0x010000B5,

         Key_KeyboardBrightnessDown:0x010000B6,

         Key_PowerOff:0x010000B7,

         Key_WakeUp:0x010000B8,

         Key_Eject:0x010000B9,

         Key_ScreenSaver:0x010000BA,

         Key_WWW:0x010000BB,

         Key_Memo:0x010000BC,

         Key_LightBulb:0x010000BD,

         Key_Shop:0x010000BE,

         Key_History:0x010000BF,

         Key_AddFavorite:0x010000C0,

         Key_HotLinks:0x010000C1,

         Key_BrightnessAdjust:0x010000C2,

         Key_Finance:0x010000C3,

         Key_Community:0x010000C4,

         Key_AudioRewind:0x010000C5,

         Key_BackForward:0x010000C6,

         Key_ApplicationLeft:0x010000C7,

         Key_ApplicationRight:0x010000C8,

         Key_Book:0x010000C9,

         Key_CD:0x010000CA,

         Key_Calculator:0x010000CB,

         Key_ToDoList:0x010000CC,

         Key_ClearGrab:0x010000CD,

         Key_Close:0x010000CE,

         Key_Copy:0x010000CF,

         Key_Cut:0x010000D0,

         Key_Display:0x010000D1,

         Key_DOS:0x010000D2,

         Key_Documents:0x010000D3,

         Key_Excel:0x010000D4,

         Key_Explorer:0x010000D5,

         Key_Game:0x010000D6,

         Key_Go:0x010000D7,

         Key_iTouch:0x010000D8,

         Key_LogOff:0x010000D9,

         Key_Market:0x010000DA,

         Key_Meeting:0x010000DB,

         Key_MenuKB:0x010000DC,

         Key_MenuPB:0x010000DD,

         Key_MySites:0x010000DE,

         Key_News:0x010000DF,

         Key_OfficeHome:0x010000E0,

         Key_Option:0x010000E1,

         Key_Paste:0x010000E2,

         Key_Phone:0x010000E3,

         Key_Calendar:0x010000E4,

         Key_Reply:0x010000E5,

         Key_Reload:0x010000E6,

         Key_RotateWindows:0x010000E7,

         Key_RotationPB:0x010000E8,

         Key_RotationKB:0x010000E9,

         Key_Save:0x010000EA,

         Key_Send:0x010000EB,

         Key_Spell:0x010000EC,

         Key_SplitScreen:0x010000ED,

         Key_Support:0x010000EE,

         Key_TaskPane:0x010000EF,

         Key_Terminal:0x010000F0,

         Key_Tools:0x010000F1,

         Key_Travel:0x010000F2,

         Key_Video:0x010000F3,

         Key_Word:0x010000F4,

         Key_Xfer:0x010000F5,

         Key_ZoomIn:0x010000F6,

         Key_ZoomOut:0x010000F7,

         Key_Away:0x010000F8,

         Key_Messenger:0x010000F9,

         Key_WebCam:0x010000FA,

         Key_MailForward:0x010000FB,

         Key_Pictures:0x010000FC,

         Key_Music:0x010000FD,

         Key_Battery:0x010000FE,

         Key_Bluetooth:0x010000FF,

         Key_WLAN:0x01000100,

         Key_UWB:0x01000101,

         Key_AudioForward:0x01000102,

         Key_AudioRepeat:0x01000103,

         Key_AudioRandomPlay:0x01000104,

         Key_Subtitle:0x01000105,

         Key_AudioCycleTrack:0x01000106,

         Key_Time:0x01000107,

         Key_Hibernate:0x01000108,

         Key_View:0x01000109,

         Key_TopMenu:0x0100010A,

         Key_PowerDown:0x0100010B,

         Key_Suspend:0x0100010C,

         Key_ContrastAdjust:0x0100010D,

         Key_LaunchG :0x0100010E,

         Key_LaunchH :0x0100010F,

         Key_MediaLast:0x0100FFFF,

         // Keypad navigation keys

         Key_Select:0x01010000,

         Key_Yes:0x01010001,

         Key_No:0x01010002,

         // Newer misc keys

         Key_Cancel :0x01020001,

         Key_Printer:0x01020002,

         Key_Execute:0x01020003,

         Key_Sleep  :0x01020004,

         Key_Play   :0x01020005, // Not the same as Key_MediaPlay

         Key_Zoom   :0x01020006,

         //Key_Jisho  :0x01020007, // IME: Dictionary key

         //Key_Oyayubi_Left:0x01020008, // IME: Left Oyayubi key

         //Key_Oyayubi_Right:0x01020009, // IME: Right Oyayubi key

         // Device keys

         Key_Context1:0x01100000,

         Key_Context2:0x01100001,

         Key_Context3:0x01100002,

         Key_Context4:0x01100003,

         Key_Call:0x01100004,      // set absolute state to in a call (do not toggle state)

         Key_Hangup:0x01100005,    // set absolute state to hang up (do not toggle state)

         Key_Flip:0x01100006,

         Key_ToggleCallHangup:0x01100007, // a toggle key for answering, or hanging up, based on current call state

         Key_VoiceDial:0x01100008,

         Key_LastNumberRedial:0x01100009,

         Key_Camera:0x01100020,

         Key_CameraFocus:0x01100021,

         Key_unknown:0x01FFFFFF

         };

     let EArrowType = {

              NoArrow:-1,

              UpArrow:-1,

              DownArrow:-1,

              LeftArrow:-1,

              RightArrow:-1

          };

     let EPenStyle = { // pen style

             NoPen:-1,

             SolidLine:-1,

             DashLine:-1,

             DotLine:-1,

             DashDotLine:-1,

             DashDotDotLine:-1,

             CustomDashLine:-1

     // #ifndef Q_MOC_RUN

             , MPenStyle:0x0F

     //#endif

         };

     let EPenCapStyle = { // line endcap style

             FlatCap:0x00,

             SquareCap:0x10,

             RoundCap:0x20,

             MPenCapStyle:0x30

         };

     let EPenJoinStyle = { // line join style

             MiterJoin:0x00,

             BevelJoin:0x40,

             RoundJoin:0x80,

             SvgMiterJoin:0x100,

             MPenJoinStyle:0x1C0

         };

     let EBrushStyle = { // brush style

             NoBrush:-1,

             SolidPattern:-1,

             Dense1Pattern:-1,

             Dense2Pattern:-1,

             Dense3Pattern:-1,

             Dense4Pattern:-1,

             Dense5Pattern:-1,

             Dense6Pattern:-1,

             Dense7Pattern:-1,

             HorPattern:-1,

             VerPattern:-1,

             CrossPattern:-1,

             BDiagPattern:-1,

             FDiagPattern:-1,

             DiagCrossPattern:-1,

             LinearGradientPattern:-1,

             RadialGradientPattern:-1,

             ConicalGradientPattern:-1,

             TexturePattern:24,

             CustomPattern:CLOUD.TexturePattern

     //#endif

         };

     let ESizeMode = {

         AbsoluteSize:-1,

         RelativeSize:-1

     };

     let EUIEffect = {

         UI_General:-1,

         UI_AnimateMenu:-1,

         UI_FadeMenu:-1,

         UI_AnimateCombo:-1,

         UI_AnimateTooltip:-1,

         UI_FadeTooltip:-1,

         UI_AnimateToolBox:-1

     };

     let ECursorShape = {

         ArrowCursor:-1,

         UpArrowCursor:-1,

         CrossCursor:-1,

         WaitCursor:-1,

         IBeamCursor:-1,

         SizeVerCursor:-1,

         SizeHorCursor:-1,

         SizeBDiagCursor:-1,

         SizeFDiagCursor:-1,

         SizeAllCursor:-1,

         BlankCursor:-1,

         SplitVCursor:-1,

         SplitHCursor:-1,

         PointingHandCursor:-1,

         ForbiddenCursor:-1,

         WhatsThisCursor:-1,

         BusyCursor:-1,

         OpenHandCursor:-1,

         ClosedHandCursor:-1,

         DragCopyCursor:-1,

         DragMoveCursor:-1,

         DragLinkCursor:-1,

         LastCursor:CLOUD.DragLinkCursor,

         BitmapCursor:24,

         CustomCursor:25

     };

     let ETextFormat = {

         PlainText:-1,

         RichText:-1,

         AutoText:-1,

         LogText:-1

      };

     let EAspectRatioMode = {

         IgnoreAspectRatio:-1,

         KeepAspectRatio:-1,

         KeepAspectRatioByExpanding:-1,

         ScaleFree:CLOUD.IgnoreAspectRatio,

         ScaleMin:CLOUD.KeepAspectRatio,

         ScaleMax:CLOUD.KeepAspectRatioByExpanding

      //#endif

          };

         // #ifdef QT3_SUPPORT

      // const AspectRatioMode ScaleMode;

      //#endif

     let EAnchorAttribute = {

              AnchorName:-1,

              AnchorHref:-1

          };

     let EDockWidgetArea = {

              LeftDockWidgetArea:0x1,

              RightDockWidgetArea:0x2,

              TopDockWidgetArea:0x4,

              BottomDockWidgetArea:0x8,

              DockWidgetArea_Mask:0xF,

              AllDockWidgetAreas:CLOUD.DockWidgetArea_Mask,

              NoDockWidgetArea:0

          };

     let EDockWidgetAreaSizes = {

              NDockWidgetAreas:4

          };

     //     Q_DECLARE_FLAGS(DockWidgetAreas, DockWidgetArea)

     let EToolBarArea = {

              LeftToolBarArea:0x1,

              RightToolBarArea:0x2,

              TopToolBarArea:0x4,

              BottomToolBarArea:0x8,

              ToolBarArea_Mask:0xF,

              AllToolBarAreas:CLOUD.ToolBarArea_Mask,

              NoToolBarArea:0

          };

     let EToolBarAreaSizes = {

              NToolBarAreas:4

          };

      //     Q_DECLARE_FLAGS(ToolBarAreas, ToolBarArea)

     let EDock = {

              DockUnmanaged:-1,

              DockTornOff:-1,

              DockTop:-1,

              DockBottom:-1,

              DockRight:-1,

              DockLeft:-1,

              DockMinimized:-1,

              Unmanaged:CLOUD.DockUnmanaged,

              TornOff:CLOUD.DockTornOff,

              Top:CLOUD.DockTop,

              Bottom:CLOUD.DockBottom,

              Right:CLOUD.DockRight,

              Left:CLOUD.DockLeft,

              Minimized:CLOUD.DockMinimized

          };

              // compatibility

      // const Dock ToolBarDock;

      //#endif

     let EDateFormat = {

             TextDate:-1,      // default Qt

             ISODate:-1,       // ISO 8601

             SystemLocaleShortDate:-1,

             SystemLocaleLongDate:-1,

             DefaultLocaleShortDate:-1,

             DefaultLocaleLongDate:-1

          };

     let ETimeSpec = {

              LocalTime:-1,

              UTC:-1,

              OffsetFromUTC:-1

          };

     let EDayOfWeek = {

              Monday:1,

              Tuesday:2,

              Wednesday:3,

              Thursday:4,

              Friday:5,

              Saturday:6,

              Sunday:7

          };

     let EScrollBarPolicy = {

              ScrollBarAsNeeded:-1,

              ScrollBarAlwaysOff:-1,

              ScrollBarAlwaysOn:-1

          };

     let ESizeAdjustPolicy = {

         /**

          * The scroll area will behave like before - and not do any adjust. */

             AdjustIgnored:0,

         /**

          * The scroll area will always adjust to the viewport */

             AdjustToContents:2,

         /**

          * The scroll area will adjust to its viewport the first time it is shown. */

             AdjustToContentsOnFirstShow:1

     };

     let EBackgroundMode = {

              FixedColor:-1,

              FixedPixmap:-1,

              NoBackground:-1,

              PaletteForeground:-1,

              PaletteButton:-1,

              PaletteLight:-1,

              PaletteMidlight:-1,

              PaletteDark:-1,

              PaletteMid:-1,

              PaletteText:-1,

              PaletteBrightText:-1,

              PaletteBase:-1,

              PaletteBackground:-1,

              PaletteShadow:-1,

              PaletteHighlight:-1,

              PaletteHighlightedText:-1,

              PaletteButtonText:-1,

              PaletteLink:-1,

              PaletteLinkVisited:-1,

              X11ParentRelative:-1

          };

     let ECaseSensitivity = {

              CaseInsensitive:-1,

              CaseSensitive:-1

          };

     let ECorner = {

              TopLeftCorner:0x00000,

              TopRightCorner:0x00001,

              BottomLeftCorner:0x00002,

              BottomRightCorner:0x00003,

              TopLeft:CLOUD.TopLeftCorner,

              TopRight:CLOUD.TopRightCorner,

              BottomLeft:CLOUD.BottomLeftCorner,

              BottomRight:CLOUD.BottomRightCorner

          };

     let EConnectionType = {

              AutoConnection:-1,

              DirectConnection:-1,

              QueuedConnection:-1,

              AutoCompatConnection:-1,

              BlockingQueuedConnection:-1,

              UniqueConnection: 0x80

          };

     let EShortcutContext = {

              WidgetShortcut:-1,

              WindowShortcut:-1,

              ApplicationShortcut:-1,

              WidgetWithChildrenShortcut:-1

          };

     let EFillRule = {

              OddEvenFill:-1,

              WindingFill:-1

          };

     let EMaskMode = {

              MaskInColor:-1,

              MaskOutColor:-1

          };

     let EClipOperation = {

              NoClip:-1,

              ReplaceClip:-1,

              IntersectClip:-1,

              UniteClip:-1

          };

              // Shape:0x1, BoundingRect:0x2

     let EItemSelectionMode = {

              ContainsItemShape:0x0,

              IntersectsItemShape:0x1,

              ContainsItemBoundingRect:0x2,

              IntersectsItemBoundingRect:0x3

          };

     let ETransformationMode = {

              FastTransformation:-1,

              SmoothTransformation:-1

          };

     let EAxis = {

              XAxis:0x0,

              YAxis:0x1,

              ZAxis:0x2

          };

     let EFocusReason = {

              MouseFocusReason:-1,

              TabFocusReason:-1,

              BacktabFocusReason:-1,

              ActiveWindowFocusReason:-1,

              PopupFocusReason:-1,

              ShortcutFocusReason:-1,

              MenuBarFocusReason:-1,

              OtherFocusReason:-1,

              NoFocusReason:-1

          };

     let EContextMenuPolicy = {

              NoContextMenu:-1,

              DefaultContextMenu:-1,

              ActionsContextMenu:-1,

              CustomContextMenu:-1,

              PreventContextMenu:-1

          };

     let EInputMethodQuery = {

              ImMicroFocus:-1,

              ImFont:-1,

              ImCursorPosition:-1,

              ImSurroundingText:-1,

              ImCurrentSelection:-1,

              ImMaximumTextLength:-1,

              ImAnchorPosition:-1

          };

     let EInputMethodHint = {

              ImhNone: 0x0,

              ImhHiddenText: 0x1,

              ImhNoAutoUppercase: 0x2,

              ImhPreferNumbers: 0x4,

              ImhPreferUppercase: 0x8,

              ImhPreferLowercase: 0x10,

              ImhNoPredictiveText: 0x20,

              ImhDigitsOnly: 0x10000,

              ImhFormattedNumbersOnly: 0x20000,

              ImhUppercaseOnly: 0x40000,

              ImhLowercaseOnly: 0x80000,

              ImhDialableCharactersOnly: 0x100000,

              ImhEmailCharactersOnly: 0x200000,

              ImhUrlCharactersOnly: 0x400000,

              ImhExclusiveInputMask: 0xffff0000

          };

         //     Q_DECLARE_FLAGS(InputMethodHints, InputMethodHint)

     let EToolButtonStyle = {

              ToolButtonIconOnly:-1,

              ToolButtonTextOnly:-1,

              ToolButtonTextBesideIcon:-1,

              ToolButtonTextUnderIcon:-1,

              ToolButtonFollowStyle:-1

          };

     let ELayoutDirection = {

              LeftToRight:0,

              RightToLeft:1,

              LayoutDirectionAuto:2

          };

     let EAnchorPoint = {

              AnchorLeft:0,

              AnchorHorizontalCenter:-1,

              AnchorRight:-1,

              AnchorTop:-1,

              AnchorVerticalCenter:-1,

              AnchorBottom:-1

          };

     let EDropAction = {

              CopyAction:0x1,

              MoveAction:0x2,

              LinkAction:0x4,

              ActionMask:0xFF,

              TargetMoveAction:0x8002,

              IgnoreAction:0x0

          };

         //     Q_DECLARE_FLAGS(DropActions, DropAction)

     let ECheckState = {

              Unchecked:-1,

              PartiallyChecked:-1,

              Checked:-1

          };

     let EItemDataRole = {

              DisplayRole:0,

              DecorationRole:1,

              EditRole:2,

              ToolTipRole:3,

              StatusTipRole:4,

              WhatsThisRole:5,

                  // Metadata

              FontRole:6,

              TextAlignmentRole:7,

              BackgroundColorRole:8,

              BackgroundRole:8,

              TextColorRole:9,

              ForegroundRole:9,

              CheckStateRole:10,

                  // Accessibility

              AccessibleTextRole:11,

              AccessibleDescriptionRole:12,

                  // More general purpose

              SizeHintRole:13,

              InitialSortOrderRole:14,

                  // Internal UiLib roles. Start worrying when public roles go that high.

              DisplayPropertyRole:27,

              DecorationPropertyRole:28,

              ToolTipPropertyRole:29,

              StatusTipPropertyRole:30,

              WhatsThisPropertyRole:31,

                  // Reserved

              UserRole:32

          };

     let EItemFlag = {

              NoItemFlags:0,

              ItemIsSelectable:1,

              ItemIsEditable:2,

              ItemIsDragEnabled:4,

              ItemIsDropEnabled:8,

              ItemIsUserCheckable:16,

              ItemIsEnabled:32,

              ItemIsTristate:64

          };

         //     Q_DECLARE_FLAGS(ItemFlags, ItemFlag)

     let EMatchFlag = {

              MatchExactly:0,

              MatchContains:1,

              MatchStartsWith:2,

              MatchEndsWith:3,

              MatchRegExp:4,

              MatchWildcard:5,

              MatchFixedString:8,

              MatchCaseSensitive:16,

              MatchWrap:32,

              MatchRecursive:64

          };

         //     Q_DECLARE_FLAGS(MatchFlags, MatchFlag)

      // const WindowFlags WFlags;

     let EWindowModality = {

              NonModal:-1,

              WindowModal:-1,

              ApplicationModal:-1

          };

     let ETextInteractionFlag = {

              NoTextInteraction        :0,

              TextSelectableByMouse    :1,

              TextSelectableByKeyboard :2,

              LinksAccessibleByMouse   :4,

              LinksAccessibleByKeyboard:8,

              TextEditable             :16,

              TextEditorInteraction    :CLOUD.TextSelectableByMouse | CLOUD.TextSelectableByKeyboard | CLOUD.TextEditable,

              TextBrowserInteraction   :CLOUD.TextSelectableByMouse | CLOUD.LinksAccessibleByMouse | CLOUD.LinksAccessibleByKeyboard

          };

         //     Q_DECLARE_FLAGS(TextInteractionFlags, TextInteractionFlag)

     let EEventPriority = {

              HighEventPriority:1,

              NormalEventPriority:0,

              LowEventPriority:-2

          };

     let ESizeHint = {

              MinimumSize:-1,

              PreferredSize:-1,

              MaximumSize:-1,

              MinimumDescent:-1,

              NSizeHints:-1

          };

     let EWindowFrameSection = {

              NoSection:0x00,

              LeftSection:0x01,           // For resize

              TopLeftSection:0x02,

              TopSection:0x03,

              TopRightSection:0x04,

              RightSection:0x05,

              BottomRightSection:0x06,

              BottomSection:0x07,

              BottomLeftSection:0x08,

              TitleBarArea:0x09    // For move

          };

     let EInitialization = {

              Uninitialized:-1

          };

     let ECoordinateSystem = {

              DeviceCoordinates:-1,

              LogicalCoordinates:-1

          };

     let ETouchPointState = {

              TouchPointPressed   :0x01,

              TouchPointMoved     :0x02,

              TouchPointStationary:0x04,

              TouchPointReleased  :0x08,

              TouchPointStateMask :0x0F,

              TouchPointPrimary   :0x10

          };

         //     Q_DECLARE_FLAGS(TouchPointStates, TouchPointState)

         // #ifndef QT_NO_GESTURES

     let EGestureState =

          {

              NoGesture:0,

              GestureStarted :1,

              GestureUpdated :2,

              GestureFinished:3,

              GestureCanceled:4

          };

     let EGestureType =

          {

              TapGesture       :1,

              TapAndHoldGesture:2,

              PanGesture       :3,

              PinchGesture     :4,

              SwipeGesture     :5,

              CustomGesture    :0x0100,

              LastGestureType  :7

          };

     let EGestureFlag =   {

              DontStartGestureOnChildren:0x01,

              ReceivePartialGestures    :0x02,

              IgnoredGesturesPropagateToParent:0x04

          };

         //     Q_DECLARE_FLAGS(GestureFlags, GestureFlag)

          //#endif // QT_NO_GESTURES

     let ENavigationMode =        {

              NavigationModeNone:-1,

              NavigationModeKeypadTabOrder:-1,

              NavigationModeKeypadDirectional:-1,

              NavigationModeCursorAuto:-1,

              NavigationModeCursorForceVisible:-1

          };

     let ECursorMoveStyle = {

              LogicalMoveStyle:-1,

              VisualMoveStyle:-1

          };

         // #ifdef Q_MOC_RUN

      //#endif

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.MouseButtons);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.Orientations);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.KeyboardModifiers);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.WindowFlags);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.Alignment);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.ImageConversionFlags);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.DockWidgetAreas);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.ToolBarAreas);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.WindowStates);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.DropActions);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.ItemFlags);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.MatchFlags);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.TextInteractionFlags);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.InputMethodHints);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.TouchPointStates);

      // Q_DECLARE_OPERATORS_FOR_FLAGS(CLOUD.GestureFlags);

      let  QInternal = {

         EPaintDeviceFlags:{

             UnknownDevice:0x00,

             Widget       :0x01,

             Pixmap       :0x02,

             Image        :0x03,

             Printer      :0x04,

             Picture      :0x05,

             Pbuffer      :0x06,    // GL pbuffer

             FramebufferObject:0x07, // GL framebuffer object

             CustomRaster :0x08,

             MacQuartz    :0x09,

             PaintBuffer  :0x0A,

             OpenGL       :0x0B

         },

         ERelayoutType:{

             RelayoutNormal:-1,

             RelayoutDragging:-1,

             RelayoutDropped:-1

         },

         ECallback:{

             ConnectCallback:-1,

             DisconnectCallback:-1,

             AdoptCurrentThread:-1,

             EventNotifyCallback:-1,

             LastCallback:-1

         },

         EInternalFunction:{

             CreateThreadForAdoption:-1,

             RefAdoptedThread:-1,

             DerefAdoptedThread:-1,

             SetCurrentThreadToMainThread:-1,

             SetQObjectSender:-1,

             GetQObjectSender:-1,

             ResetQObjectSender:-1,

             LastInternalFunction:-1

         },

         EDockPosition:{

             LeftDock:-1,

             RightDock:-1,

             TopDock:-1,

             BottomDock:-1,

             DockCount:-1

         },

         RegisterCallback:function(Callback, qInternalCallback){},

         UnregisterCallback:function(Callback, qInternalCallback){},

         ActivateCallbacks:function(Callback){},

         CallFunction:function(InternalFunction_func){}

     };

     Q_ENUMS([

         EScrollBarPolicy, EFocusPolicy, EContextMenuPolicy,EArrowType, EToolButtonStyle,

         EPenStyle, EPenCapStyle, EPenJoinStyle, EBrushStyle, EFillRule, EMaskMode, EBGMode,

         EClipOperation, ESizeMode, EBackgroundMode,EAxis, ECorner, ELayoutDirection, ESizeHint, EOrientation, EDropAction,

         EDockWidgetArea, EToolBarArea,ETextFormat,ETextElideMode, EDateFormat, ETimeSpec,

         EDayOfWeek, ECursorShape, EGlobalColor, EAspectRatioMode, ETransformationMode,

         EKey, EShortcutContext, ETextInteractionFlag, EItemSelectionMode, ECheckState,

         ESortOrder, ECaseSensitivity, EWindowType, EWindowState, EWindowModality, EWidgetAttribute, EApplicationAttribute,

         EInputMethodHint, EConnectionType, EGestureState, EGestureType, ECursorMoveStyle

     ]);

        /*

     Q_FLAGS([

         EAlignments, EOrientations, EDropActions,EDockWidgetAreas, EToolBarAreas,

         EImageConversionFlags,ETextInteractionFlags,EItemFlags,EMatchFlags,EKeyboardModifiers,

         EMouseButtons,EWindowFlags, EWindowStates, EInputMethodHints]);

      */

     //if(__NODEJS__)

let Enums =

    {

        GlobalColor          : EGlobalColor,

        KeyboardModifier     : EKeyboardModifier,

        Modifier             : EModifier,

        MouseButton          : EMouseButton,

        ButtonState          : EButtonState,

        Orientation          : EOrientation,

        FocusPolicy          : EFocusPolicy,

        SortOrder            : ESortOrder,

        TileRule             : ETileRule,

        AlignmentFlag        : EAlignmentFlag,

        TextFlag             : ETextFlag,

        TextElideMode        : ETextElideMode,

        WindowType           : EWindowType,

        WindowState          : EWindowState,

        WidgetAttribute      : EWidgetAttribute,

        ApplicationAttribute : EApplicationAttribute,

        ImageConversionFlag  : EImageConversionFlag,

        BGMode               : EBGMode,

        PaintUnit            : EPaintUnit,

        GUIStyle             : EGUIStyle,

        Key                  : EKey,

        ArrowType            : EArrowType,

        PenStyle             : EPenStyle,

        PenCapStyle          : EPenCapStyle,

        PenJoinStyle         : EPenJoinStyle,

        BrushStyle           : EBrushStyle,

        SizeMode             : ESizeMode,

        UIEffect             : EUIEffect,

        CursorShape          : ECursorShape,

        TextFormat           : ETextFormat,

        AspectRatioMode      : EAspectRatioMode,

        AnchorAttribute      : EAnchorAttribute,

        DockWidgetArea       : EDockWidgetArea,

        DockWidgetAreaSizes  : EDockWidgetAreaSizes,

        ToolBarArea          : EToolBarArea,

        ToolBarAreaSizes     : EToolBarAreaSizes,

        Dock                 : EDock,

        DateFormat           : EDateFormat,

        TimeSpec             : ETimeSpec,

        DayOfWeek            : EDayOfWeek,

        ScrollBarPolicy      : EScrollBarPolicy,

        BackgroundMode       : EBackgroundMode,

        CaseSensitivity      : ECaseSensitivity,

        Corner               : ECorner,

        ConnectionType       : EConnectionType,

        ShortcutContext      : EShortcutContext,

        FillRule             : EFillRule,

        MaskMode             : EMaskMode,

        ClipOperation        : EClipOperation,

        ItemSelectionMode    : EItemSelectionMode,

        TransformationMode   : ETransformationMode,

        Axis                 : EAxis,

        FocusReason          : EFocusReason,

        ContextMenuPolicy    : EContextMenuPolicy,

        InputMethodQuery     : EInputMethodQuery,

        InputMethodHint      : EInputMethodHint,

        ToolButtonStyle      : EToolButtonStyle,

        LayoutDirection      : ELayoutDirection,

        AnchorPoint          : EAnchorPoint,

        DropAction           : EDropAction,

        CheckState           : ECheckState,

        ItemDataRole         : EItemDataRole,

        ItemFlag             : EItemFlag,

        MatchFlag            : EMatchFlag,

        WindowModality       : EWindowModality,

        TextInteractionFlag  : ETextInteractionFlag,

        EventPriority        : EEventPriority,

        SizeHint             : ESizeHint,

        WindowFrameSection   : EWindowFrameSection,

        Initialization       : EInitialization,

        CoordinateSystem     : ECoordinateSystem,

        TouchPointState      : ETouchPointState,

        GestureState         : EGestureState,

        GestureType          : EGestureType,

        GestureFlag          : EGestureFlag,

        NavigationMode       : ENavigationMode,

        CursorMoveStyle      : ECursorMoveStyle

    };

    qEnums( QB, Enums );

     exports = Enums;

     //if( __ES6__ )

     /* export {

         EScrollBarPolicy, EFocusPolicy, EContextMenuPolicy,EArrowType, EToolButtonStyle,

         EPenStyle, EPenCapStyle, EPenJoinStyle, EBrushStyle, EFillRule, EMaskMode, EBGMode,

         EClipOperation, ESizeMode, EBackgroundMode,EAxis, ECorner, ELayoutDirection, ESizeHint, EOrientation, EDropAction,

         EDockWidgetArea, EToolBarArea,ETextFormat,ETextElideMode, EDateFormat, ETimeSpec,

         EDayOfWeek, ECursorShape, EGlobalColor, EAspectRatioMode, ETransformationMode,

         EKey, EShortcutContext, ETextInteractionFlag, EItemSelectionMode, ECheckState,

         ESortOrder, ECaseSensitivity, EWindowType, EWindowState, EWindowModality, EWidgetAttribute, EApplicationAttribute,

         EInputMethodHint, EConnectionType, EGestureState, EGestureType, ECursorMoveStyle 

     }; */

     return Enums;


});