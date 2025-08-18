import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../contexts/RoleContext';
import { useAuth } from '../../contexts/AuthContext';
import { User, Building2, ArrowRight } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const { user } = useAuth();

  const handleRoleSelect = (role: 'applicant' | 'employer') => {
    setRole(role);
    
    // Redirect based on role
    if (role === 'applicant') {
      navigate('/home');
    } else {
      navigate('/employer/add-job');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-amber-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ยินดีต้อนรับ
          </h1>
          <p className="text-gray-600">
            {user?.name || 'ผู้ใช้'} กรุณาเลือกประเภทการใช้งาน
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {/* Applicant Card */}
          <button
            onClick={() => handleRoleSelect('applicant')}
            className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    ผู้หางาน
                  </h3>
                  <p className="text-sm text-gray-600">
                    ค้นหางานที่ใช่ เจอโอกาสใหม่
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          {/* Employer Card */}
          <button
            onClick={() => handleRoleSelect('employer')}
            className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-green-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    ผู้จ้างงาน
                  </h3>
                  <p className="text-sm text-gray-600">
                    หาคนที่ใช่ เจอคนเก่ง
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            คุณสามารถเปลี่ยนประเภทการใช้งานได้ในภายหลัง
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;