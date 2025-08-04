import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Star, 
  Shield, 
  Link, 
  Unlink, 
  Plus,
  X,
  Check,
  Edit,
  LogOut
} from 'lucide-react';
import BottomNavigation from '../shared/BottomNavigation';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, firebaseUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [showLinkAccountModal, setShowLinkAccountModal] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'ธันวา พรหมมินทร์',
    title: 'พนักงานบริการ',
    location: 'กรุงเทพฯ',
    joinDate: 'ม.ค. 2020',
    rating: 4.8,
    reviews: 128,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    about: 'พนักงานบริการที่มีประสบการณ์ 5+ ปี มีความเชี่ยวชาญในการให้บริการลูกค้าอย่างมีประสิทธิภาพ และสามารถทำงานในหลากหลายสภาพแวดล้อมได้ดี',
    skills: [
      'พนักงานเสิร์ฟ',
      'พนักงานเก็บเงิน',
      'ทำความสะอาด',
      'จัดส่งอาหาร',
      'พนักงานขาย'
    ],
    contact: {
      phone: '081-234-5678',
      email: 'thanwa@example.com'
    },
    experience: [
      {
        id: 1,
        position: 'พนักงานเสิร์ฟ',
        company: 'ร้านอาหารสยาม',
        duration: 'ม.ค. 2022 - ปัจจุบัน',
        description: 'ดูแลการเสิร์ฟอาหารและเครื่องดื่มให้กับลูกค้า รับผิดชอบการรักษาความสะอาดของร้าน'
      },
      {
        id: 2,
        position: 'พนักงานเก็บเงิน',
        company: '7-Eleven',
        duration: 'มิ.ย. 2020 - ธ.ค. 2021',
        description: 'รับผิดชอบการเก็บเงิน การดูแลสินค้า และบริการลูกค้า'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'ประกาศนียบัตรวิชาชีพ (ปวช.)',
        institution: 'วิทยาลัยเทคนิคกรุงเทพ',
        field: 'สาขาอาหารและโรงแรม',
        year: '2018 - 2020'
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'หลักสูตรการบริการลูกค้า',
        issuer: 'สถาบันพัฒนาฝีมือแรงงาน',
        year: '2021'
      },
      {
        id: 2,
        name: 'หลักสูตรความปลอดภัยในอาหาร',
        issuer: 'สำนักงานคณะกรรมการอาหารและยา',
        year: '2020'
      }
    ]
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!firebaseUser) {
      navigate('/');
    }
  }, [firebaseUser, navigate]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!firebaseUser) return;
      
      setIsLoadingProfile(true);
      try {
        const token = await firebaseUser.getIdToken();
        const response = await fetch('/api/user/profile/detailed', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [firebaseUser]);

  const handleLogout = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?')) {
      await logout();
    }
  };

  const handleLinkAccount = () => {
    setShowLinkAccountModal(true);
  };

  const handleUnlinkAccount = async (providerId: string) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการเชื่อมโยงกับ ${getProviderName(providerId)}?`)) {
      try {
        const response = await fetch('/api/user/unlink-provider', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ providerId })
        });

        if (response.ok) {
          alert('ยกเลิกการเชื่อมโยงบัญชีสำเร็จ');
          // รีเฟรชข้อมูล
          if (user?.id) {
            setIsLoadingProfile(true);
            try {
              const response = await fetch('/api/user/profile/detailed', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              });
              if (response.ok) {
                const data = await response.json();
                setUserProfile(data.user);
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
            } finally {
              setIsLoadingProfile(false);
            }
          }
        } else {
          alert('เกิดข้อผิดพลาดในการยกเลิกการเชื่อมโยง');
        }
      } catch (error) {
        console.error('Error unlinking account:', error);
        alert('เกิดข้อผิดพลาดในการยกเลิกการเชื่อมโยง');
      }
    }
  };

  const handleLinkProvider = async (provider: string) => {
    setIsLinking(true);
    try {
      let idToken = '';
      
      if (provider === 'line') {
        // ใช้ LINE LIFF สำหรับ login
        if ((window as any).liff) {
          if (!(window as any).liff.isLoggedIn()) {
            (window as any).liff.login();
            return;
          }
          idToken = (window as any).liff.getIDToken() || '';
        } else {
          alert('LINE LIFF ไม่พร้อมใช้งาน');
          return;
        }
      } else if (provider === 'google') {
        // ใช้ Google Sign-In
        const googleAuth = (window as any).gapi?.auth2?.getAuthInstance();
        if (googleAuth) {
          const googleUser = await googleAuth.signIn();
          idToken = googleUser.getAuthResponse().id_token;
        } else {
          alert('Google Sign-In ไม่พร้อมใช้งาน');
          return;
        }
      }

      if (!idToken) {
        alert('ไม่สามารถเข้าสู่ระบบได้');
        return;
      }

      const response = await fetch('/api/user/link-provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          provider, 
          idToken 
        })
      });

      if (response.ok) {
        alert('เชื่อมโยงบัญชีสำเร็จ');
        setShowLinkAccountModal(false);
        // รีเฟรชข้อมูล
        if (user?.id) {
          setIsLoadingProfile(true);
          try {
            const response = await fetch('/api/user/profile/detailed', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            if (response.ok) {
              const data = await response.json();
              setUserProfile(data.user);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          } finally {
            setIsLoadingProfile(false);
          }
        }
      } else {
        const errorData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errorData.message || 'ไม่สามารถเชื่อมโยงบัญชีได้'}`);
      }
    } catch (error) {
      console.error('Error linking account:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมโยงบัญชี');
    } finally {
      setIsLinking(false);
    }
  };

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'line':
        return '🔗';
      case 'google.com':
        return '🔍';
      default:
        return '🔐';
    }
  };

  const getProviderName = (providerId: string) => {
    switch (providerId) {
      case 'line':
        return 'LINE';
      case 'google.com':
        return 'Google';
      default:
        return providerId;
    }
  };

  // ใช้รูปโปรไฟล์จาก LINE ถ้ามี และไม่ใช่รูป default
  const getProfileImage = () => {
    // ใช้รูปจาก firebaseUser ก่อน
    if (firebaseUser?.photoURL) {
      return firebaseUser.photoURL;
    }
    
    // ใช้รูปจาก userProfile
    if (userProfile?.photoURL) {
      return userProfile.photoURL;
    }
    
    // ใช้รูปจาก user context
    if (user?.picture) {
      return user.picture;
    }
    
    // ใช้รูป default
    return profileData.profileImage;
  };

  const stats = [
    { label: 'ปีประสบการณ์', value: '5+' },
    { label: 'งานที่ทำ', value: '42' },
    { label: 'ความพึงพอใจ', value: '98%' }
  ];

  return (
    <div className="min-h-screen bg-yellow-50 pb-20">
      
      
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="flex justify-center mb-4 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-yellow-300 overflow-hidden shadow-lg">
                <img 
                  src={getProfileImage()} 
                  alt={userProfile?.displayName || profileData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-yellow-100"><svg class="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                    }
                  }}
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 shadow-lg hover:bg-yellow-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold">
              {firebaseUser?.displayName || userProfile?.displayName || user?.name || profileData.name}
            </h1>
            <p className="text-yellow-100">{profileData.title}</p>
            <div className="flex items-center justify-center mt-2">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <span className="ml-1">{profileData.rating} ({profileData.reviews} รีวิว)</span>
            </div>
          </div>
        </div>

        {/* Account & Login Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-bold text-gray-800">ข้อมูลบัญชี</h2>
          </div>
          
          <div className="space-y-4">
            {/* User ID */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">User ID:</span>
              <span className="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                {userProfile?.uid || user?.id || 'N/A'}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">อีเมล:</span>
              <span className="text-sm text-gray-800">
                {userProfile?.email || user?.email || 'ไม่ระบุ'}
              </span>
            </div>

            {/* Email Verification */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">ยืนยันอีเมล:</span>
              <span className={`text-sm ${userProfile?.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                {userProfile?.emailVerified ? '✓ ยืนยันแล้ว' : '✗ ยังไม่ยืนยัน'}
              </span>
            </div>

            {/* Account Status */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">สถานะบัญชี:</span>
              <span className={`text-sm ${userProfile?.disabled ? 'text-red-600' : 'text-green-600'}`}>
                {userProfile?.disabled ? '❌ ถูกระงับ' : '✓ ปกติ'}
              </span>
            </div>

            {/* Join Date */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">วันที่สมัคร:</span>
              <span className="text-sm text-gray-800">
                {userProfile?.metadata?.creationTime ? 
                  new Date(userProfile.metadata.creationTime).toLocaleDateString('th-TH') : 
                  profileData.joinDate}
              </span>
            </div>

            {/* Last Sign In */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">เข้าสู่ระบบล่าสุด:</span>
              <span className="text-sm text-gray-800">
                {userProfile?.metadata?.lastSignInTime ? 
                  new Date(userProfile.metadata.lastSignInTime).toLocaleString('th-TH') : 
                  'ไม่ระบุ'}
              </span>
            </div>
          </div>
        </div>

        {/* Linked Accounts */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Link className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-bold text-gray-800">บริการที่เชื่อมโยง</h2>
          </div>
          
          {isLoadingProfile ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* LINE */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🔗</span>
                  <div>
                    <div className="font-medium text-gray-800">LINE</div>
                    <div className="text-sm text-gray-500">
                      {userProfile?.providerData?.find((p: any) => p.providerId === 'line') ? 'เชื่อมโยงแล้ว' : 'ยังไม่เชื่อมโยง'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {userProfile?.providerData?.find((p: any) => p.providerId === 'line') ? (
                    <>
                      <button className="text-blue-500 hover:text-blue-700 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUnlinkAccount('line')}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleLinkProvider('line')}
                      className="text-green-500 hover:text-green-700 p-1"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Google */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🔍</span>
                  <div>
                    <div className="font-medium text-gray-800">Google</div>
                    <div className="text-sm text-gray-500">
                      {userProfile?.providerData?.find((p: any) => p.providerId === 'google.com') ? 'เชื่อมโยงแล้ว' : 'ยังไม่เชื่อมโยง'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {userProfile?.providerData?.find((p: any) => p.providerId === 'google.com') ? (
                    <>
                      <button className="text-blue-500 hover:text-blue-700 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUnlinkAccount('google.com')}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleLinkProvider('google')}
                      className="text-green-500 hover:text-green-700 p-1"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📘</span>
                  <div>
                    <div className="font-medium text-gray-800">Facebook</div>
                    <div className="text-sm text-gray-500">ยังไม่เชื่อมโยง</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => alert('ฟีเจอร์นี้จะเปิดใช้งานเร็วๆ นี้')}
                    className="text-green-500 hover:text-green-700 p-1"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Apple */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🍎</span>
                  <div>
                    <div className="font-medium text-gray-800">Apple</div>
                    <div className="text-sm text-gray-500">ยังไม่เชื่อมโยง</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => alert('ฟีเจอร์นี้จะเปิดใช้งานเร็วๆ นี้')}
                    className="text-green-500 hover:text-green-700 p-1"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <LogOut className="w-4 h-4 mr-2" />
          ออกจากระบบ
        </button>
      </div>

      {/* Link Account Modal */}
      {showLinkAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">เชื่อมโยงบัญชีเพิ่มเติม</h3>
              <button 
                onClick={() => setShowLinkAccountModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {/* LINE */}
              <button
                onClick={() => handleLinkProvider('line')}
                disabled={isLinking}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🔗</span>
                  <div>
                    <div className="font-medium text-gray-800">LINE</div>
                    <div className="text-sm text-gray-500">เชื่อมโยงกับบัญชี LINE</div>
                  </div>
                </div>
                {isLinking ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Google */}
              <button
                onClick={() => handleLinkProvider('google')}
                disabled={isLinking}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🔍</span>
                  <div>
                    <div className="font-medium text-gray-800">Google</div>
                    <div className="text-sm text-gray-500">เชื่อมโยงกับบัญชี Google</div>
                  </div>
                </div>
                {isLinking ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowLinkAccountModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;