const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// ユーザー登録
router.post('/sign-in', async (req, res) => {
  const { id, email, password } = req.body;

  // 入力チェック
  if (!id || !email || !password) {
    return res.status(400).json({ message: 'ID、メールアドレス、パスワードをすべて入力してください。' });
  }

  try {
    // メールアドレスまたはIDの重複チェック
    const existingUser = await User.findOne({ where: { email } });
    const existingId = await User.findOne({ where: { id } });

    if (existingUser) {
      return res.status(400).json({ message: '既に登録されたメールアドレスです。' });
    }
    if (existingId) {
      return res.status(400).json({ message: '既に使用されているIDです。' });
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('生成されたハッシュ:', hashedPassword); // デバッグ用

    // 新規ユーザーを作成
    const newUser = await User.create({ id, email, password: hashedPassword });

    res.status(201).json({
      message: 'アカウントが正常に作成されました。',
      email: newUser.email,
    });
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
});

// ログイン
router.post('/login', async (req, res) => {
  const { id, password } = req.body;

  console.log('リクエストボディ:', req.body); // デバッグ用

  // 入力チェック
  if (!id || !password) {
    return res.status(400).json({ message: 'IDとパスワードを入力してください。' });
  }

  try {
    // IDでユーザーを検索
    const user = await User.findOne({ where: { id } });

    if (!user) {
      console.log('ユーザーが見つかりません。'); // デバッグ用
      return res.status(400).json({ message: 'ユーザーが見つかりません。' });
    }

    // パスワードの検証
    console.log('入力パスワード:', password);
    console.log('保存されたハッシュ:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('パスワード比較結果:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'パスワードが正しくありません。' });
    }

    console.log('ログイン成功: ユーザーID:', user.id);

    // トークンを生成
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      id: user.id,
      message: 'ログイン成功',
    });
  } catch (error) {
    console.error('ログインエラー:', error); // デバッグ用
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
});

// ログアウト (クライアント側でトークンを削除することを促すだけ)
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'ログアウト成功。トークンを削除してください。' });
});

module.exports = router;
