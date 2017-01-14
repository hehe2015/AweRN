package com.awesomeproject;

import android.content.Context;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class DesUtil extends ReactContextBaseJavaModule{

    public static final String REACTCLASSNAME = "DesUtil";
    private Context mContext;

    public DesUtil(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return REACTCLASSNAME;
    }

    /**
     * 必须添加反射注解不然会报错
     * 这个方法就是ReactNative将要调用的方法，会通过此类名字调用
     * @param msg
     */
    @ReactMethod
    public void callNativeMethod(String msg) {
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
    }

    public static final char[] legalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  			.toCharArray();

  	public static byte[] iv = { 1, 2, 3, 4, 5, 6, 7, 8 };

  	public static String encode(byte[] data) {
  		int start = 0;
  		int len = data.length;
  		StringBuffer buf = new StringBuffer(data.length * 3 / 2);

  		int end = len - 3;
  		int i = start;
  		int n = 0;

  		while (i <= end) {
  			int d = ((((int) data[i]) & 0x0ff) << 16)
  					| ((((int) data[i + 1]) & 0x0ff) << 8)
  					| (((int) data[i + 2]) & 0x0ff);

  			buf.append(legalChars[(d >> 18) & 63]);
  			buf.append(legalChars[(d >> 12) & 63]);
  			buf.append(legalChars[(d >> 6) & 63]);
  			buf.append(legalChars[d & 63]);

  			i += 3;

  			if (n++ >= 14) {
  				n = 0;
  				buf.append(" ");
  			}
  		}

  		if (i == start + len - 2) {
  			int d = ((((int) data[i]) & 0x0ff) << 16)
  					| ((((int) data[i + 1]) & 255) << 8);

  			buf.append(legalChars[(d >> 18) & 63]);
  			buf.append(legalChars[(d >> 12) & 63]);
  			buf.append(legalChars[(d >> 6) & 63]);
  			buf.append("=");
  		} else if (i == start + len - 1) {
  			int d = (((int) data[i]) & 0x0ff) << 16;

  			buf.append(legalChars[(d >> 18) & 63]);
  			buf.append(legalChars[(d >> 12) & 63]);
  			buf.append("==");
  		}

  		return buf.toString();
  	}

  	public static byte[] decode(String s) {

  		ByteArrayOutputStream bos = new ByteArrayOutputStream();
  		try {
  			decode(s, bos);
  		} catch (IOException e) {
  			throw new RuntimeException();
  		}
  		byte[] decodedBytes = bos.toByteArray();
  		try {
  			bos.close();
  			bos = null;
  		} catch (IOException ex) {
  			System.err.println("Error while decoding BASE64: " + ex.toString());
  		}
  		return decodedBytes;
  	}

  	public static void decode(String s, OutputStream os) throws IOException {
  		int i = 0;

  		int len = s.length();

  		while (true) {
  			while (i < len && s.charAt(i) <= ' ')
  				i++;

  			if (i == len)
  				break;

  			int tri = (decode(s.charAt(i)) << 18)
  					+ (decode(s.charAt(i + 1)) << 12)
  					+ (decode(s.charAt(i + 2)) << 6)
  					+ (decode(s.charAt(i + 3)));

  			os.write((tri >> 16) & 255);
  			if (s.charAt(i + 2) == '=')
  				break;
  			os.write((tri >> 8) & 255);
  			if (s.charAt(i + 3) == '=')
  				break;
  			os.write(tri & 255);

  			i += 4;
  		}
  	}

  	public static int decode(char c) {
  		if (c >= 'A' && c <= 'Z')
  			return ((int) c) - 65;
  		else if (c >= 'a' && c <= 'z')
  			return ((int) c) - 97 + 26;
  		else if (c >= '0' && c <= '9')
  			return ((int) c) - 48 + 26 + 26;
  		else
  			switch (c) {
  			case '+':
  				return 62;
  			case '/':
  				return 63;
  			case '=':
  				return 0;
  			default:
  				throw new RuntimeException("unexpected code: " + c);
  			}
  	}

    /**
     * 必须添加反射注解不然会报错
     * 这个方法就是ReactNative将要调用的方法，会通过此类名字调用
     * @param msg
     */
    // @ReactMethod
  	// public String encryptDES(String encryptString) throws Exception {
  	// 	return encryptDES(encryptString, "gxhlqn88");
  	// }


    /**
     * 必须添加反射注解不然会报错
     * 这个方法就是ReactNative将要调用的方法，会通过此类名字调用
     * @param msg
     */
    @ReactMethod
  	public void encryptDES(String encryptString, String encryptKey,Callback callback) {
      try {
        IvParameterSpec zeroIv = new IvParameterSpec(iv);
    		SecretKeySpec key = new SecretKeySpec(encryptKey.getBytes(), "DES");
    		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
    		// Cipher cipher = Cipher.getInstance("DES/ECB/NoPadding");
    		cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
    		byte[] encryptedData = cipher.doFinal(encryptString.getBytes());
    		callback.invoke(DesUtil.encode(encryptedData));
		  } catch (Exception e) {
			     callback.invoke("-1");
		  }
  	}

    /**
     * 必须添加反射注解不然会报错
     * 这个方法就是ReactNative将要调用的方法，会通过此类名字调用
     * @param msg
     */
    // @ReactMethod
  	// public String decryptDES(String decryptString) throws Exception {
  	// 	return decryptDES(decryptString, "gxhlqn88");
  	// }

    /**
     * 必须添加反射注解不然会报错
     * 这个方法就是ReactNative将要调用的方法，会通过此类名字调用
     * @param msg
     */
    @ReactMethod
  	public void decryptDES(String decryptString, String decryptKey,Callback callback){
      try {
        byte[] byteMi = DesUtil.decode(decryptString);
    		IvParameterSpec zeroIv = new IvParameterSpec(iv);
    		SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes(), "DES");
    		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
    		cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);
    		byte decryptedData[] = cipher.doFinal(byteMi);
            callback.invoke(new String(decryptedData));
		} catch (Exception e) {
            callback.invoke("-1");
		}
  	}


}
